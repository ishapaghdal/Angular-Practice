import { Component, EventEmitter, Output, inject } from '@angular/core';
import { HomeComponent } from '../home.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TempreturePipe } from '../../tempreture.pipe';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,DatePipe, TempreturePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  http = inject(HttpClient);
  router = inject(Router);

  currentDate = Date.now();
  temp = 100;

  obj: any;

  onSubmit() {
    console.warn(this.LoginForm.value);
    this.http
      .post('http://127.0.0.1:8000/login/', this.LoginForm.value)
      .subscribe((response) => {
        this.obj = response;
        console.log(this.obj);

        if (this.obj.status == 200) {
          localStorage.setItem('token',this.obj.data.access)
          this.router.navigate(['/dashboard'],{
            replaceUrl: true,
          })
        }
      });
  }
  @Output() changeLogin = new EventEmitter<boolean>();

  toggleLogin() {
    this.changeLogin.emit(false);
  }

  LoginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
}
