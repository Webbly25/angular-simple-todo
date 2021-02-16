import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksOverviewComponent } from './tasks-overview/tasks-overview.component';
import { TaskViewComponent } from './task-view/task-view.component';

const routes: Routes = [
  { path: 'overview', component: TasksOverviewComponent },
  { path: 'tasks/new', component: TaskViewComponent },
  { path: 'tasks/:id', component: TaskViewComponent },
  { path: '', redirectTo: 'overview', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
