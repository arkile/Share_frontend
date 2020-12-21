import { Component, OnInit } from '@angular/core';
import {PropositionModel} from '../models/proposition';
import {PROPOSITIONS} from '../mock-propositions';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PropositionRequest} from '../models/proposition-request';
import {MessageService} from '../services/message-service';
import {AcceptPropositionModel} from '../models/accept-proposition-model';

@Component({
  selector: 'app-proposition',
  templateUrl: './proposition.component.html',
  styleUrls: ['./proposition.component.css']
})
export class PropositionComponent implements OnInit {

  proposition: PropositionModel;
  viewId: number;
  lat = 12;
  imgUrl = 'https://cdn.shopify.com/s/files/1/0806/0141/products/KALA-LTP-MH-KIT_1024x1024.jpg?v=1571914470';
  lng = 57;


    constructor(private activatedRoute: ActivatedRoute, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe(params => {
        this.viewId = params.viewId;
      });
      // this.proposition = PROPOSITIONS[this.viewId - 1];
      this.loadProposition();
      // console.warn(sessionStorage.getItem('token'));
  }

  // tslint:disable-next-line:typedef


  loadProposition(): void {
      const requestData = {
        viewId: this.viewId
      } as PropositionRequest;
      this.messageService.loadOneProposition(requestData).subscribe(resp => {
        const data = resp.body;
        this.proposition = {
          id: this.viewId,
          name: data.name,
          createDate: data.createDate,
          authorId: data.authorId,
          description: data.description,
          status: data.status,
          location: data.location,
          images: data.images,
          authorName: data.authorName
        } as PropositionModel;
      }, error => {
        if (error.status === 404){
          alert('Ця пропозиція більше не доступна');
          this.router.navigate(['/main-menu']);
        } else {
          console.error('Unexpected server response, code: ' + error.status);
          alert('Сталася помилка сервера. Спробуйте пізніше');
          this.router.navigate(['/main-page']);
        }
        console.log('Error loading proposition');
      });
  }

  isActive(): boolean {
      // if (this.proposition.status === undefined){
      //   return false;
      // }
      return (this.proposition.status === 1);
  }

  acceptProposition(): void {
      if (!this.messageService.isAuthorized()){
        alert('Спершу зареєструйтесь!');
        this.router.navigate(['/login']);
      }
      else {
        const requestData = {
          viewId: this.proposition.id
        } as AcceptPropositionModel;
        this.messageService.acceptProposition(requestData).subscribe(resp => {
          alert('Пропозиція прийнята!');
          console.log('proposition accepted successfully');
          this.router.navigate(['/main-page']);
        }, error => {
          switch (error.status) {
            case 403:
              alert('Невірний аутентифікаційний код. Спробуйте ще раз');
              this.messageService.logOut();
              break;
            case 410:
              alert('Пропозиція більше недоступна');
              this.router.navigate(['/main-page']);
              break;
            case 409:
              alert('Ви не можете прийняти власну пропозицію)');
              break;
            default:
              console.error(error.error + ', status: ' + error.status);
              alert('Сталася помилка. спробуйте пізніше');
              console.warn('ACCEPTING FAILED');
          }
        });
      }

  }

}
