import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonFormComponent } from '../person-form/person-form';


// Material Table Modules
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-people-list',
  standalone: true, 
  imports: [ CommonModule,
  MatTableModule,
  MatDialogModule,
  MatButtonModule],
  templateUrl: './people-list.html',
  styleUrls: ['./people-list.css'], 
})
export class PeopleListComponent {

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];

  dataSource = new MatTableDataSource([
  { name: 'Mikel Obi', email: 'mikel@gmail.com', phone: '1234567890' },
  { name: 'Peter Osaze', email: 'pita@gmail.com', phone: '0987654321' },
]);

  constructor(private dialog: MatDialog) {}

 addPerson() {
  const dialogRef = this.dialog.open(PersonFormComponent, {
    width: '400px',
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('DIALOG RESULT:', result); 

    if (result) {
      
        this.dataSource.data = [...this.dataSource.data, result];
        console.log('UPDATED DATASOURCE:', this.dataSource); 
     
     
    }
  });
}

  editPerson(person: any) {
  const dialogRef = this.dialog.open(PersonFormComponent, {
    width: '400px',
    data: person // 🔥 send data
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.dataSource.data = this.dataSource.data.map(p =>
        p === person ? result : p
      );
    }
  });
}

  deletePerson(person: any) {
  this.dataSource.data = this.dataSource.data.filter(p => p !== person);
}


}