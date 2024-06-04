import {Component, OnInit} from '@angular/core';
import {CommonModule, NgIf} from "@angular/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {User} from "../../models";
import {response} from "express";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  standalone: true,
  imports: [CommonModule, NgIf, RouterLink]
})
export class ProfileComponent implements OnInit{
  email: string = "";
  name: string = "";
  rating = "";
  wins: string = "";
  victory: string = "";
  draws: string = "";
  defeats: string = "";
  logged: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
    if (this.authService.isLoggedIn()){
      this.http.get('http://127.0.0.1:8000/checkers/user', {headers: {Authorization: 'Token ${token}'}})
        .subscribe(
          (response: any) =>{
            this.email = response.email
            this.name = response.name
            this.http.get('http://127.0.0.1:8000/checkers/player-info', {headers: {Authorization: 'Token ${token}'}})
              .subscribe(
                (playerInfoResponse: any) =>{
                  this.rating = playerInfoResponse.rating
                  this.wins = playerInfoResponse.wins
                  this.victory = playerInfoResponse.victory
                  this.draws = playerInfoResponse.draws
                  this.defeats = playerInfoResponse.defeats
                }
              )
          },
          (error)=>{
            console.log(error)
          }
        )
    }

  }
  logout(): void {
    this.logged = false;
    this.authService.logout();
    this.router.navigateByUrl("/home")
  }

}
