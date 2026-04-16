import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { TaskFormComponent } from '../task-form/task-form';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
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

  dataSource: any[] = [ ]; 

  constructor(private dialog: MatDialog) {}

  addTask() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource = [
          ...this.dataSource,
          {
            ...result,
            id: Date.now(),
            completed: false,
            person: { name: 'Unassigned', email: '', phone: '' },
            priority: 'Medium',
            labels: []
          }
        ];
      }
    });
  }

  editTask(task: any) {
  console.log('Edit Task:', task);
}

  deleteTask(task: any) {
  this.dataSource = this.dataSource.filter(t => t !== task);
}
}