import {Component, OnInit} from '@angular/core';
import {Lessons} from "../../../models";
import {LessonsService} from "../../../service/lessons.service";
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css',
  providers: [ LessonsService],
  standalone: true,
  imports: [RouterLink, CommonModule]
})
export class LessonsComponent implements OnInit{
  lessons!: Lessons[];
  loaded: boolean;
  constructor(private lessonsService: LessonsService, private router: Router) {
    this.lessons = [];
    this.loaded = true;
  }

  ngOnInit(): void {
    this.getLessons();
  }
  getLessons(){
    this.lessonsService.getLessons().subscribe( (lessons) => {
        this.lessons = lessons;
        this.loaded = true;
      }
    )
  }
}
