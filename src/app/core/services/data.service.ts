import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private people = [
    { name: 'Mikel Obi', email: 'mikel@gmail.com', phone: '1234567890' },
    { name: 'Peter Osaze', email: 'pita@gmail.com', phone: '0987654321' },
  ];

  private tasks: any[] = [];

  // PEOPLE
  getPeople() {
    return this.people;
  }

  addPerson(person: any) {
    this.people.push(person);
  }

  updatePerson(oldPerson: any, newPerson: any) {
    const index = this.people.indexOf(oldPerson);
    if (index !== -1) this.people[index] = newPerson;
  }

  deletePerson(person: any) {
    this.people = this.people.filter(p => p !== person);
  }

  // TASKS
  getTasks() {
    return this.tasks;
  }

  addTask(task: any) {
    this.tasks.push(task);
  }

  updateTask(index: number, task: any) {
    this.tasks[index] = task;
  }

  deleteTask(task: any) {
    this.tasks = this.tasks.filter(t => t !== task);
  }
}