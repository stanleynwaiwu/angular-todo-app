import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonFormComponent } from '../person-form/person-form';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';

import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './people-list.html',
  styleUrls: ['./people-list.css'],
})
export class PeopleListComponent {

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];

  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private dialog: MatDialog,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.dataSource.data = this.dataService.getPeople();
  }

  addPerson() {
    const dialogRef = this.dialog.open(PersonFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.addPerson(result);
        this.loadPeople();
      }
    });
  }

  editPerson(person: any) {
    const dialogRef = this.dialog.open(PersonFormComponent, {
      width: '400px',
      data: { person }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.updatePerson(person, result);
        this.loadPeople();
      }
    });
  }

  deletePerson(person: any) {
    this.dataService.deletePerson(person);
    this.loadPeople();
  }
}