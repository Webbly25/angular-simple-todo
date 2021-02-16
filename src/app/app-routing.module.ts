import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksOverviewComponent } from './tasks-overview/tasks-overview.component';
import { TaskFormComponent } from './task-form/task-form.component';

const routes: Routes = [
  { path: 'overview', component: TasksOverviewComponent },
  { path: 'tasks/new', component: TaskFormComponent },
  { path: 'tasks/:id', component: TaskFormComponent },
  { path: '', redirectTo: 'overview', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
