import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from '../../types/Task';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService extends InMemoryDbService {

  // tslint:disable-next-line:typedef
  createDb() {
    const tasks: Task[] = [
      { id: 1, name: 'Unfinished task', description: 'This is my demo unfinished task' },
      { id: 2, name: 'Finished task', finishedOn: new Date() },
    ];
    return { tasks };
  }

  // Overrides the genId method to ensure that a task always has an id.
  // If the tasks array is empty,
  // the method below returns the initial number (1).
  // If the tasks array is not empty, the method below returns the highest
  // task id + 1.
  genId(tasks: Task[]): number {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map(task => task.id)) + 1;
  }

}
