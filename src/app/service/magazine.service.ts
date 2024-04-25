import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Magazine} from "../models";

@Injectable({
  providedIn: 'root'
})
export class MagazineService {
  private BASE_URL: string = 'http://127.0.0.1:8000/checkers/magazine';
  constructor(private client: HttpClient ) { }
  getMagazine(): Observable<Magazine[]>{
    return this.client.get<Magazine[]>(this.BASE_URL);
  }
}
