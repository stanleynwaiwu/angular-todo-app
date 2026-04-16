import { Component, signal } from '@angular/core';
import { PeopleListComponent } from './features/people/components/people-list/people-list';
import { TaskListComponent } from './features/tasks/components/task-list/task-list';


@Component({
  selector: 'app-root',
  imports: [PeopleListComponent, TaskListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-todo-app');
}
