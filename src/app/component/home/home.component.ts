import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    NgIf
  ]
})
export class HomeComponent implements OnInit{
    // logged = false;
    constructor(
      private authService: AuthService
    ) {
    }

  ngOnInit(): void {
      // this.logged = this.authService.isLoggedIn()
  }

}
