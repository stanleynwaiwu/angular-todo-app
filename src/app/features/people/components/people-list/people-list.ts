import { Component } from '@angular/core';

@Component({
  selector: 'app-people-list',
  standalone: true, // ✅ VERY IMPORTANT
  imports: [],
  templateUrl: './people-list.html',
  styleUrls: ['./people-list.css'], // ✅ correct spelling
})
export class PeopleListComponent {}