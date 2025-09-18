import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../entity/user';
import { EmailExistsValidator } from '../service/email-validator/email-exists-validator';

@Component({
  selector: 'user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm implements OnInit{
  userForm!: FormGroup;
  private emailValidator!: EmailExistsValidator

  @Output() public onFormSubmitted = new EventEmitter<User>();

  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required], ],
      email: ['', [Validators.email, Validators.required]],
      department: ['']
    }, )
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.userForm?.valid) {
      let user: User = this.userForm.value as User;
      this.onFormSubmitted.emit(user);
    }
    this.userForm.reset(); 
  }
}
