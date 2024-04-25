import {Component,} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  standalone: true
})

export class AppComponent{
  title: "Checkers" | undefined;

}

