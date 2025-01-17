import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MessageService} from '../services/message-service';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {LoginModel} from '../models/login-model';

export class LoginErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  errorMatcher = new LoginErrorStateMatcher();
  hide = true;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit(){
    this.login();
  }

  // tslint:disable-next-line:typedef
  login(){
    const loginData = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    } as LoginModel;
    this.loginForm.controls.email.disable();
    this.loginForm.controls.password.disable();
    this.messageService.login(loginData).subscribe(resp => {
      const data = resp.body;
      sessionStorage.setItem('token', data.accessToken);
      this.messageService.loggedIn = true;
      this.router.navigate(['/']);
      console.warn('LOGIN SUCCEEDED');
      console.log(localStorage.getItem('token'));
    }, error => {
      console.warn('LOGIN FAILED: ');
      switch (error.status){
        case 404:
          alert('Вказаний email не зареєстровано в базі. Перевірте введені дані та спробуйте ще раз');
          break;
        case 403:
          alert('Невірно вказаний пароль. спробуйте ще раз');
          break;
        default:
          console.error('Unexpected server response: ' + error);
          alert('Сталася помилка сервера. Спробуйте пізніше');
          this.router.navigate(['/main-page']);
      }
      this.loginForm.controls.email.enable();
      this.loginForm.controls.password.enable();
    });
  }


}
