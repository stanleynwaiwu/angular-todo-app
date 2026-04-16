import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { TaskFormComponent } from '../task-form/task-form';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent {

  displayedColumns: string[] = [
    'title',
    'person',
    'priority',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>([]);

  constructor(private dialog: MatDialog) {}

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
    }
  });
}
getPeople() {
  return [
    { name: 'Mikel Obi', email: 'mikel@gmail.com', phone: '1234567890' },
    { name: 'Peter Osaze', email: 'pita@gmail.com', phone: '0987654321' },
  ];
}

isEditMode = false;
editingIndex: number | null = null;
 editTask(task: any) {
  const index = this.dataSource.data.findIndex(t => t === task);

  const dialogRef = this.dialog.open(TaskFormComponent, {
    width: '500px',
    data: {
      people: this.getPeople(),
      task: task
    }
  });

  this.isEditMode = true;
  this.editingIndex = index;

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const updated = [...this.dataSource.data];
      updated[index] = result;

      this.dataSource.data = updated;
    }

    this.isEditMode = false;
    this.editingIndex = null;
  });
}
 deleteTask(task: any) {
  this.dataSource.data = this.dataSource.data.filter(t => t !== task);
}
}