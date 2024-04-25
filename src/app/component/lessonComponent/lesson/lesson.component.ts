import {Component, OnInit} from '@angular/core';
import {Lessons} from "../../../models";
import {LessonsService} from "../../../service/lessons.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-lesson ',
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class LessonComponent implements OnInit{
  lesson: Lessons | undefined;
  loaded: boolean | undefined;
  videoUrl: SafeResourceUrl | undefined;
  constructor(private route: ActivatedRoute,
              private lessonService: LessonsService,
              private sanitizer: DomSanitizer){
    this.lesson = {} as Lessons;
    this.loaded = true;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) =>{
      const id = Number(params.get('id'));
      this.loaded = false;
      this.lessonService.getLesson(id).subscribe((lesson) =>{
        this.lesson = lesson;
        this.loaded = true;
      })
    })

  }
  sanitizeUrl(url: String | undefined): SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl(<string>url);
  }
}
