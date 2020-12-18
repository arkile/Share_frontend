import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {RegistrationModel} from '../models/registration-model';
import {TokenModel} from '../models/token-model';
import {LoginModel} from '../models/login-model';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private registerURL = 'http://localhost:5000/register';
  private loginURL = 'http://localhost:5000/login';

  public loggedIn = false;

  constructor(private http: HttpClient, private router: Router){}

  // tslint:disable-next-line:typedef
  register(registerData: RegistrationModel){
    return this.http.post<TokenModel>(this.registerURL, registerData);
  }

  // tslint:disable-next-line:typedef
  login(loginData: LoginModel){
    return this.http.post<TokenModel>(this.loginURL, loginData);
  }

  logOut(): void{
    localStorage.setItem('token', '');
    this.loggedIn = false;
    this.router.navigate(['/main-page']);
  }

  isAuthorized(): boolean{
    const x = localStorage.getItem('token');
    if (x === 'undefined'){
      return false;
    }
    return true;
  }
}
