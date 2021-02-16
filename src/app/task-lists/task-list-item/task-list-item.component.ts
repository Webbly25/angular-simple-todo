import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../types/Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: [ './task-list-item.component.scss' ]
})
export class TaskListItemComponent implements OnInit {

  @Input() task?: Task;
  @Output() clicked = new EventEmitter();
  @Output() finished = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  /**
   * Handle clicks on the main task item
   * Emit the clicked event for it to be handled elsewhere
   */
  onClick(): void {
    if (!this.task) return;

    this.clicked.emit(this.task.id);
  }

  /**
   * Finish the task using the taskService
   * Emit the finished event with the task id
   */
  onFinish(): void {
    if (!this.task) return;

    const id = this.task.id;
    this.taskService.finishTask(this.task)
      .subscribe(_ => this.finished.emit(id));
  }

  /**
   * Delete the task using the taskService
   * Emit the deleted event with the task id
   */
  onDelete(): void {
    if (!this.task) return;

    const id = this.task.id;
    this.taskService.deleteTask(id)
      .subscribe(_ => this.deleted.emit(id));
  }

}
