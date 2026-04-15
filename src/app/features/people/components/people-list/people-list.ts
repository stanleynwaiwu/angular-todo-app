import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material Table Modules
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-people-list',
  standalone: true, 
  imports: [CommonModule, MatTableModule],
  templateUrl: './people-list.html',
  styleUrls: ['./people-list.css'], 
})
export class PeopleListComponent {
  displayedColumns: string[] = ['name', 'email', 'phone'];

  dataSource = [
    { name: 'Mikel Obi', email: 'mikel@gmail.com', phone: '1234567890' },
    { name: 'Peter Osaze', email: 'pita@gmail.com', phone: '0987654321' },
  ];
}