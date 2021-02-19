import { Injectable } from '@angular/core';
import { Task } from '../../types/Task';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'api/tasks'; // URL to web api
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(
    private http: HttpClient,
    private alertService: AlertService) {}

  /**
   * Add a new task into the storage
   * @param task The new task to save
   */
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions)
      .pipe(
        tap((newTask: Task) => this.alertService.addSuccess('added task id=' + newTask.id)),
        catchError(this.handleError<Task>('addTask'))
      );
  }

  /**
   * Update a task
   * @param task The task to update based of its id
   */
  updateTask(task: Task): Observable<any> {
    return this.http.put(this.tasksUrl, task, this.httpOptions)
      .pipe(
        tap(_ => this.alertService.addSuccess('updated task id=' + task.id)),
        catchError(this.handleError<Task>('updateTask'))
      );
  }

  /**
   * Finish the task
   * Sets the finished on attribute then calls updateTask
   * @param task The task to finish
   */
  finishTask(task: Task): Observable<any> {
    task.finishedOn = new Date();
    return this.updateTask(task);
  }

  /**
   * Delete the task task
   * @param task The task or task id to delete
   */
  deleteTask(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = this.tasksUrl + '/' + id;

    return this.http.delete<Task>(url, this.httpOptions)
      .pipe(
        tap(_ => this.alertService.addSuccess('deleted task id=' + id)),
        catchError(this.handleError<Task>('deleteTask'))
      );
  }

  /**
   * Get a task by its id
   * @param id The id of the task to get
   */
  getTaskById(id: number): Observable<Task> {
    const url = this.tasksUrl + '/' + id;
    return this.http.get<Task>(url)
      .pipe(
        catchError(this.handleError<Task>('getTaskById id=' + id))
      );
  }

  /**
   * Get all tasks as an observable
   */
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        catchError(this.handleError<Task[]>('getAllTasks', []))
      );
  }

  /**
   * Get all unfinished tasks as an observable
   */
  getUnfinishedTasks(): Observable<Task[]> {
    return this.getAllTasks()
      .pipe(
        map(tasks => tasks.filter(task => !task.finishedOn))
      );
  }

  /**
   * Get all finished tasks as an observable
   */
  getFinishedTasks(): Observable<Task[]> {
    return this.getAllTasks()
      .pipe(
        map(tasks => tasks.filter(task => task.finishedOn))
      );
  }

  /**
   * Handle errors
   * @param operation The operation that caused the error
   * @param result An optional result to return
   */
  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      // this would be sent to remote logging infrastructure
      console.error(operation, result);

      this.alertService.addDanger(operation + ' ' + error);

      // let the app keep running by returning an empty result
      return of(result as T);
    };
  }

}
