import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
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
import {AcceptPropositionModel} from '../models/accept-proposition-model';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private registerURL = 'http://localhost:5000/register';
  private loginURL = 'http://localhost:5000/login';
  private mainURL = 'http://localhost:5000/main';
  private propositionURL = 'http://localhost:5000/view_proposition';
  private createPropositionURL = 'http://localhost:5000/create_proposition';
  private acceptPropositionURL = 'http://localhost:5000/accept_proposition';

  public loggedIn = false;
  private httpOptions = {observe: 'response' as const};

  constructor(private http: HttpClient, private router: Router){}

  // tslint:disable-next-line:typedef
  handleError(error) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      alert('Сталася помилка. Перезавантажте сайт');
      this.logOut();
    } else {
      console.error(
        `Сталася помилка сервера з кодом ${error.status}, ` +
        ` текст: ${error.error}`);
    }
    return throwError('some shit');
  }

  // tslint:disable-next-line:typedef
  register(registerData: RegistrationModel): Observable<HttpResponse<TokenModel>> {
    return this.http.post<TokenModel>(this.registerURL, registerData, this.httpOptions);
  }

  // tslint:disable-next-line:typedef
  login(loginData: LoginModel): Observable<HttpResponse<TokenModel>> {
    return this.http.post<TokenModel>(this.loginURL, loginData, this.httpOptions);
  }

  logOut(): void{
    sessionStorage.setItem('token', '');
    this.loggedIn = false;
    this.router.navigate(['/main-page']);
  }

  // tslint:disable-next-line:typedef
  loadPropositions(listRequest: ListRequestModel): Observable<HttpResponse<PropositionsListModel>> {
    return this.http.post<PropositionsListModel>(this.mainURL, listRequest, this.httpOptions);
  }

  // tslint:disable-next-line:typedef
  // showLoadPropositionsResponse(listRequest: ListRequestModel){
  //   return this.http.post<PropositionsListModel>(this.mainURL, listRequest, this.httpOptions);
      // .pipe(
      //   catchError(this.handleMenuError)
      // );
  // }

  // tslint:disable-next-line:typedef
  loadOneProposition(propositionRequest: PropositionRequest): Observable<HttpResponse<PropositionModel>>  {
    return this.http.post<PropositionModel>(this.propositionURL, propositionRequest, this.httpOptions);
  }

  // tslint:disable-next-line:typedef
  createProposition(newPropositionModel: NewPropositionModel): Observable<HttpResponse<ResponseMessageModel>> {
    return this.http.post<ResponseMessageModel>(this.createPropositionURL, newPropositionModel, this.httpOptions);
  }

  // tslint:disable-next-line:typedef
  acceptProposition(acceptRequest: AcceptPropositionModel): Observable<HttpResponse<any>>  {
    return this.http.post(this.acceptPropositionURL, acceptRequest, this.httpOptions);
  }

  isAuthorized(): boolean{
    const x = sessionStorage.getItem('token');
    if (x === 'undefined' || x === '' || x === null){
      return false;
    }
    return true;
  }
}
