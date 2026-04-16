
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person-form.html',
  styleUrl: './person-form.css',
})
export class PersonFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PersonFormComponent>
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });
  }

 submit() {
  console.log('FORM VALUE:', this.form.value);
  console.log('FORM VALID:', this.form.valid);

  if (this.form.valid) {
    this.dialogRef.close(this.form.value);
  }
}

  cancel() {
    this.dialogRef.close();
  }
}