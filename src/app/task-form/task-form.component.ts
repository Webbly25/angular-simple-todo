import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../../types/Task';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { markFormGroupTouched } from '../utils';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: [ './task-form.component.scss' ]
})
export class TaskFormComponent implements OnInit {

  @Input() editing = false;
  @Input() editTask = {} as Task;
  @Output() submitted = new EventEmitter();

  taskForm = this.formBuilder.group({
    name: [ '', Validators.required ],
    description: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    // if we are editing the form, pre-validate it
    if (this.editing) {
      this.taskForm.patchValue(this.editTask);
      markFormGroupTouched(this.taskForm);
    }
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

    this.taskForm.reset();

    if (this.editing) {
      // are we editing a task
      task.id = this.editTask.id;
      this.taskService.updateTask(task)
        .subscribe(_ => this.submitted.emit(task));
    } else {
      // we are making a new task
      this.taskService.addTask(task)
        .subscribe(newTask => this.submitted.emit(newTask));
    }
  }

  //
  // getters
  //
  get name(): AbstractControl { return this.taskForm.get('name') as AbstractControl; }

  get description(): AbstractControl { return this.taskForm.get('description') as AbstractControl; }

}
