import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Lessons} from "../models";

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private BASE_URL: string = 'http://127.0.0.1:8000/checkers/lessons';
  constructor(private client: HttpClient ) { }
  getLessons(): Observable<Lessons[]>{
    return this.client.get<Lessons[]>(this.BASE_URL);
  }
  getLesson(ID: number): Observable<Lessons>{
    return this.client.get<Lessons>(`${this.BASE_URL}/${ID}`);
  }
}
