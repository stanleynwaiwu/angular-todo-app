import { Component, signal } from '@angular/core';
import { PeopleListComponent } from './features/people/components/people-list/people-list';

@Component({
  selector: 'app-root',
  imports: [PeopleListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-todo-app');
}
