import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TasksOverviewComponent } from './tasks-overview/tasks-overview.component';
import { AlertContainerComponent } from './alerts/alert-container/alert-container.component';
import { AlertItemComponent } from './alerts/alert-item/alert-item.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskListComponent } from './task-lists/task-list/task-list.component';
import { TaskListItemComponent } from './task-lists/task-list-item/task-list-item.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskViewComponent } from './task-view/task-view.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksOverviewComponent,
    AlertContainerComponent,
    AlertItemComponent,
    TaskListComponent,
    TaskListItemComponent,
    TaskFormComponent,
    TaskViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
