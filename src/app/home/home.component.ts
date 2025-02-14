import { Component, signal } from '@angular/core';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [LoginComponent,SignupComponent, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  IsLoginPage = signal(true);
  
  toggleLogin(temp: boolean) {
    this.IsLoginPage.set(temp);
  }
}
