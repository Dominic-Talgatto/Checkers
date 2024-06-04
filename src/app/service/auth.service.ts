import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  // private document: any;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  setToken(token: string){
    sessionStorage.setItem(this.tokenKey, token);
  }
  getToken(): string | null {
    // const s =  sessionStorage.getItem(this.tokenKey);
    // if(s){
    //   return s
    // } else {
    //   return "";
    // }

    //условная проверка (альтернатива):
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return window.sessionStorage.getItem(this.tokenKey);
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  logout(){
    sessionStorage.removeItem(this.tokenKey);

  }

}

