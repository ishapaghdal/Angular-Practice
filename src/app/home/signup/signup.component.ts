import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SafeLinkDirective } from '../../self-link.directive';
import { AuthDirective } from '../../auth.directive';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, SafeLinkDirective, AuthDirective],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css', 
})
export class SignupComponent {
  http = inject(HttpClient);

  obj: any;

  private taskService = inject(TasksService);
  tasks = this.taskService.allTasks() ;

  onSubmit() {
    console.warn(this.signUpForm.value);
    this.http
      .post('http://127.0.0.1:8000/users/', this.signUpForm.value)
      .subscribe((response) => {
        this.obj = response;
        console.log(this.obj);
      });
  }

  @Output() changeLogin = new EventEmitter<boolean>();
  toggleLogin() {
    this.changeLogin.emit(true);
  }

  signUpForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl(''),
    bio: new FormControl(''),
    picture: new FormControl(''),
    phone_number: new FormControl(''),
  });
}
