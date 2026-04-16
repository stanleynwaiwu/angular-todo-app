import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { Priority, Label } from '../../../../core/enums/enums';
import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})
export class TaskFormComponent {

  priorities = Object.values(Priority);
  labels = Object.values(Label);

  form: FormGroup;

  people: any[] = [];
  filteredPeople: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    //  ALWAYS GET LATEST PEOPLE 
    this.people = this.dataService.getPeople();
    this.filteredPeople = this.people;

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: [null, Validators.required],
      labels: [[]],
      person: [null, Validators.required],
      startDate: [new Date()],
      completed: [false]
    });

    // EDIT MODE SUPPORT
    if (this.data?.task) {
      this.form.patchValue(this.data.task);
    }
  }

  //  AUTOCOMPLETE FILTER
  filterPeople(event: any) {
    const value = event.target.value?.toLowerCase() || '';

    this.filteredPeople = this.people.filter(p =>
      p.name.toLowerCase().includes(value)
    );
  }

  //SAVE
  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

   //CANCEL
  cancel() {
    this.dialogRef.close();
  }
}