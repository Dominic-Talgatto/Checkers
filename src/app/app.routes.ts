import { Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {LessonsComponent} from "./component/lessonComponent/lessons/lessons.component";
import {LessonComponent} from "./component/lessonComponent/lesson/lesson.component";
import {SignInComponent} from "./component/sign-in/sign-in.component";
import {SignUpComponent} from "./component/sign-up/sign-up.component";
import {ProfileComponent} from "./component/profile/profile.component";
import {MagazineComponent} from "./component/magazine/magazine.component";
import {Wrong404Component} from "./component/wrong404/wrong404.component";
import {PlayComponent} from "./component/play/play.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  { path: 'lessons', component: LessonsComponent, data: { title: 'Lessons' } },
  { path: 'lessons/:id', component: LessonComponent, data: { title: 'Lesson' } },
  { path: 'signIn', component: SignInComponent, data: { title: 'Sign In' } },
  { path: 'signUp', component: SignUpComponent, data: { title: 'Sign Up' } },
  {path: 'profile', component: ProfileComponent},
  { path: 'play', component: PlayComponent, data: { title: 'Play' } },
  { path: 'magazine', component: MagazineComponent, data: { title: 'Magazine' } },
  { path: '**', component: Wrong404Component, data: { title: '404' } }
];
