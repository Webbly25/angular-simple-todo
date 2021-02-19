import { Component, OnInit } from '@angular/core';
import { Task } from '../../types/Task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks-overview',
  templateUrl: './tasks-overview.component.html',
  styleUrls: [ './tasks-overview.component.scss' ]
})
export class TasksOverviewComponent implements OnInit {

  unfinishedTasks: Task[] = [];
  finishedTasks: Task[] = [];
  allTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  /**
   * Subscribe to the unfinished tasks observer
   */
  ngOnInit(): void {
    this.taskService.getUnfinishedTasks()
      .subscribe(tasks => this.unfinishedTasks = tasks);

    this.taskService.getFinishedTasks()
      .subscribe(tasks => this.finishedTasks = tasks);

    this.taskService.getAllTasks()
      .subscribe(tasks => this.allTasks = tasks);
  }

}
