import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

import { TaskFormComponent } from '../task-form/task-form';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'title',
    'description',
    'person',
    'priority',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>(this.loadTasks());

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // LOAD TASKS
  loadTasks() {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  }

  // SAVE TASKS
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.dataSource.data));
  }

  // ADD TASK
  addTask() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '500px',
      data: {
        people: this.getPeople()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = [
          ...this.dataSource.data,
          result
        ];

        this.saveTasks();
      }
    });
  }

  // EDIT TASK 
  editTask(task: any) {

    const index = this.dataSource.data.findIndex(
      (t, i) => i === this.dataSource.data.indexOf(task)
    );

    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '500px',
      data: {
        people: this.getPeople(),
        task
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && index > -1) {

        const updated = [...this.dataSource.data];
        updated[index] = result;

        this.dataSource.data = updated;

        this.saveTasks();
      }
    });
  }

  // DELETE TASK
  deleteTask(task: any) {
    this.dataSource.data = this.dataSource.data.filter(
      t => t !== task
    );

    this.saveTasks();
  }

  // MOCK PEOPLE (now synced via localStorage fallback later in next step)
  getPeople() {
    const saved = localStorage.getItem('people');

    return saved
      ? JSON.parse(saved)
      : [
          { name: 'Mikel Obi', email: 'mikel@gmail.com', phone: '1234567890' },
          { name: 'Peter Osaze', email: 'pita@gmail.com', phone: '0987654321' }
        ];
  }
}