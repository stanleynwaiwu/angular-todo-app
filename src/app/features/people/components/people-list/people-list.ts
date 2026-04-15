import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material Table Modules
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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

  dataSource = [
    { name: 'Mikel Obi', email: 'mikel@gmail.com', phone: '1234567890' },
    { name: 'Peter Osaze', email: 'pita@gmail.com', phone: '0987654321' },
  ];

  editPerson(person: any) {
  console.log('Edit clicked:', person);
}

deletePerson(person: any) {
  console.log('Delete clicked:', person);
}
}