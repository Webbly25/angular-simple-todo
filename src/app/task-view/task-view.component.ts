import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../../types/Task';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: [ './task-view.component.scss' ]
})
export class TaskViewComponent implements OnInit {

  loaded = false;
  editingTask = false;
  task: Task = {} as Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  /**
   * Call get task to try and load the id
   * If there is no id then create a new task
   * Otherwise edit the task
   */
  ngOnInit(): void {
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
      this.task = {} as Task;
      return;
    }

    this.editingTask = true;
    this.taskService.getTaskById(+id)
      .subscribe(task => {
        this.loaded = true;
        this.task = task;
      });
  }

}
