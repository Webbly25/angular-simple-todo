import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../../types/Task';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: [ './task-list.component.scss' ]
})
export class TaskListComponent implements OnInit {

  @Input() name = 'Todo Group';
  @Input() tasks: Task[] = [];

  @ViewChild('modal_content') content?: Element;
  selectedTask: Task = {} as Task;
  taskModal?: NgbModalRef;

  constructor(private modalService: NgbModal) {}

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

  /**
   * Handle a task click
   * Launch a modal containing the edit form for the task
   * @param id The id of the task that was clicked
   */
  onTaskClick(id: number): void {
    this.selectedTask = this.tasks.find(task => task.id === id) as Task;
    this.taskModal = this.modalService.open(this.content);
  }

  /**
   * Handle the task form submitting
   * Update the tasks list to include the new value
   * @param updatedTask The updated task value
   */
  onTaskSubmit(updatedTask: Task): void {
    this.taskModal?.close();

    // get the index of the task to update
    const taskIndex = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex === null) {
      // if the task wasn't found add it to the end
      this.tasks.push(updatedTask);
    } else {
      // the task was found so replace the values with the new ones
      this.tasks[taskIndex] = updatedTask;
    }
  }

}
