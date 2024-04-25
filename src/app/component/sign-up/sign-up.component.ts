import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {HttpClient} from "@angular/common/http";
import {LogUp} from "../../models";
@Component({
  selector: 'app-sign-up[uniqueAttribute]',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule
  ]
})
export class SignUpComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder

  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email:'',
      password: ''
    })
  }
  onSignUp(){
    this.http.post<LogUp>('http://127.0.0.1:8000/checkers/register', this.form.getRawValue())
      .subscribe(res=>{
        this.router.navigate(['/signIn']);
      })
  }


}
