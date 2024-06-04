import {Component, OnInit,} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "./service/auth.service";
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    RouterLink,
    NgIf
  ],
  standalone: true
})

export class AppComponent implements OnInit{
  title: "Checkers" | undefined;
  logged = false
  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.logged = this.authService.isLoggedIn();
  }

  logout(): void {
    this.logged = false;
    this.authService.logout();
  }


}

