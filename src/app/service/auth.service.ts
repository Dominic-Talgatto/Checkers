import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Token, User} from "../models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor() { }

  setToken(token: string){
    localStorage.setItem(this.tokenKey, token);
  }
  getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  logout(){
    this.removeToken()
  }
}

