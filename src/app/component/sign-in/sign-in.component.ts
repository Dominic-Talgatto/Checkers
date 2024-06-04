import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ProfileComponent} from "../profile/profile.component";
import {LogIn} from "../../models";
import {response} from "express";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SignInComponent{
  email: string = "";
  password: string = "";
  loginError: string = "";
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  onSignIn(): void {
    const loginData = {email: this.email, password: this.password};
    this.http.post<any>('http://127.0.0.1:8000/checkers/login', loginData)
      .subscribe(
        (response) => {
          this.authService.setToken(response.token);
          // window.location.reload();
          this.router.navigateByUrl('/profile')
        },
        (error)=>{
          this.loginError = 'Ошибка входа: неверный email или пароль';
          alert(this.loginError);
        }
      );
  }
}
