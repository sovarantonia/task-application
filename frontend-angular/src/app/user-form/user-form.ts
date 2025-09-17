import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm implements OnInit{
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      department: ['']
    })
  }

  onSubmit() {
    if (this.userForm?.valid) {
      console.log("Form data: ", this.userForm.value);
    }
  }

}
