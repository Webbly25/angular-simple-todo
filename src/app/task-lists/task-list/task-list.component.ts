import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../types/Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: [ './task-list.component.scss' ]
})
export class TaskListComponent implements OnInit {

  @Input() name = 'Todo Group';
  @Input() tasks: Task[] = [];

  constructor() {}

  ngOnInit(): void {}

  /**
   * Handle an item being deleted by removing it from the array
   * @param id The id of the task deleted
   */
  onItemDeleted(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  /**
   * Delegate to onItemDeleted since this view only cares about finished tasks
   * @param id The id of the task finished
   */
  onItemFinished(id: number): void {
    this.onItemDeleted(id);
  }

}
