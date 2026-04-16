import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

import { Priority, Label } from '../../../../core/enums/enums';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
  CommonModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
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
 constructor(
  private fb: FormBuilder,
  private dialogRef: MatDialogRef<TaskFormComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
) {
 this.people = this.data.people;

    this.form = this.fb.group({
  title: ['', [Validators.required, Validators.minLength(3)]],
  description: [''],
  priority: [null, Validators.required],
  labels: [[]],
  person: [null, Validators.required],
  startDate: [new Date()],
  completed: [false]
});


  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}