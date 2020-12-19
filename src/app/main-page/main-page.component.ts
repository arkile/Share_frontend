import { Component, OnInit } from '@angular/core';
import {PROPOSITIONS} from '../mock-propositions';
import {Router} from '@angular/router';
import {PropositionModel} from '../models/proposition';
import {MessageService} from '../services/message-service';
import {ListRequestModel} from '../models/list-request-model';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  propositions = PROPOSITIONS;
  listSize = 5;
  defaultLocation = [37, 77];
  location = this.defaultLocation;

  constructor(private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    // this.loadPropositions();
  }

  view_proposition(proposition: PropositionModel, propId: number): void {
    this.router.navigate(['/view-proposition'], {
      queryParams: {
        viewId: propId
      }
    }).then(nav => {
      console.log(nav);
    }, error => {
      console.log(error);
    });
  }

  private loadPropositions(): void {
    const requestData = {
      location: this.location
    } as ListRequestModel;
    console.warn('loading');
    this.messageService.loadPropositions(requestData).subscribe(data => {
      this.propositions = data.propositions;
      console.log('data loaded');
    }, error => {
      console.warn('Loading propositions failed');
      console.warn(error);
    });
  }

}

