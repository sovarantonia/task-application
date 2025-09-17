import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../entity/user';

@Component({
  selector: 'user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm implements OnInit{
  userForm!: FormGroup;

  @Output() public onFormSubmitted = new EventEmitter<User>();

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
      let user: User = this.userForm.value as User;
      this.onFormSubmitted.emit(user);
    }
    
  }

}
