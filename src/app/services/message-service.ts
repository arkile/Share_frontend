import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {RegistrationModel} from '../models/registration-model';
import {TokenModel} from '../models/token-model';
import {LoginModel} from '../models/login-model';
import {PropositionsListModel} from '../models/propositions-list-model';
import {ListRequestModel} from '../models/list-request-model';
import {PropositionRequest} from '../models/proposition-request';
import {PropositionModel} from '../models/proposition';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private registerURL = 'http://localhost:5000/register';
  private loginURL = 'http://localhost:5000/login';
  private mainURL = 'http://localhost:5000/main';
  private propositionURL = 'http://localhost:5000/view-proposition';

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
    sessionStorage.setItem('token', '');
    this.loggedIn = false;
    this.router.navigate(['/main-page']);
  }

  // tslint:disable-next-line:typedef
  loadPropositions(listRequest: ListRequestModel) {
    return this.http.post<PropositionsListModel>(this.mainURL, listRequest);
  }

  // tslint:disable-next-line:typedef
  loadOneProposition(propositionRequest: PropositionRequest) {
    return this.http.post<PropositionModel>(this.propositionURL, propositionRequest);
  }

  isAuthorized(): boolean{
    const x = sessionStorage.getItem('token');
    if (x === 'undefined' || x === '' || x === null){
      console.log('unauthorized access');
      return false;
    }
    console.log('authorized access: ' + x);
    return true;
  }
}
