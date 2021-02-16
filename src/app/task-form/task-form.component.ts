import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../../types/Task';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { markFormGroupTouched } from '../utils';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: [ './task-form.component.scss' ]
})
export class TaskFormComponent implements OnInit {

  loaded = false;

  editing = false;
  taskId: number | null = null;
  taskForm = this.formBuilder.group({
    name: [ '', Validators.required ],
    description: ''
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private location: Location
  ) {}

  /**
   * Call get task to try and load the id
   * If there is no id then create a new task
   * Otherwise edit the task
   */
  ngOnInit(): void {
    console.log(this.taskForm.get('name'));
    this.getTask();
  }

  /**
   * Attempt to get the task from the URL
   * If making a new task then set editing to false
   */
  getTask(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id === null) {
      this.loaded = true;
      return;
    }

    this.editing = true;
    this.taskService.getTaskById(+id)
      .subscribe(task => {
        this.loaded = true;

        this.taskId = +id;
        this.taskForm.patchValue(task);
        markFormGroupTouched(this.taskForm);
      });
  }

  /**
   * Perform a final validation on the task
   * Submit the task then return to the overview screen
   */
  onSubmit(): void {
    const task: Task = this.taskForm.value as Task;
    if (task.description !== undefined && task.description.replace(/\s/g, '') === '') {
      task.description = undefined;
    }

    let fn;

    if (this.taskId) {
      // are we editing a task
      task.id = this.taskId;
      fn = this.taskService.updateTask(task);
    } else {
      // we are making a new task
      fn = this.taskService.addTask(task);
    }

    // once the service is done go back to the overview page
    fn.subscribe(_ => this.location.back());
  }

  //
  // getters
  //
  get name(): AbstractControl { return this.taskForm.get('name') as AbstractControl; }

  get description(): AbstractControl { return this.taskForm.get('description') as AbstractControl; }

}
