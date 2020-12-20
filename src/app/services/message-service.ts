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
import {NewPropositionModel} from '../models/new-proposition';
import {ResponseMessageModel} from '../models/ResponseMessageModel';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private registerURL = 'http://localhost:5000/register';
  private loginURL = 'http://localhost:5000/login';
  private mainURL = 'http://localhost:5000/main';
  private propositionURL = 'http://localhost:5000/view_proposition';
  private createPropositionURL = 'http://localhost:5000/create_proposition';

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

  // tslint:disable-next-line:typedef
  createProposition(newPropositionModel: NewPropositionModel) {
    return this.http.post<ResponseMessageModel>(this.createPropositionURL, newPropositionModel);
  }

  isAuthorized(): boolean{
    const x = sessionStorage.getItem('token');
    if (x === 'undefined' || x === '' || x === null){
      return false;
    }
    return true;
  }
}
