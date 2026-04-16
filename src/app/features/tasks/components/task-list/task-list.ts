import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
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
}