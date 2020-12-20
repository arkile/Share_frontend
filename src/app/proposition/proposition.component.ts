import { Component, OnInit } from '@angular/core';
import {PropositionModel} from '../models/proposition';
import {PROPOSITIONS} from '../mock-propositions';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {PropositionRequest} from '../models/proposition-request';
import {MessageService} from '../services/message-service';

@Component({
  selector: 'app-proposition',
  templateUrl: './proposition.component.html',
  styleUrls: ['./proposition.component.css']
})
export class PropositionComponent implements OnInit {

  proposition;
  viewId: number;
  lat = 12;

  lng = 57;

    constructor(private activatedRoute: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe(params => {
        this.viewId = params.viewId;
      });
      // this.proposition = PROPOSITIONS[this.viewId - 1];
      this.loadProposition();
      // console.warn(sessionStorage.getItem('token'));
  }

  loadProposition(): void {
      const requestData = {
        viewId: this.viewId
      } as PropositionRequest;
      this.messageService.loadOneProposition(requestData).subscribe(data => {
        this.proposition = {
          id: this.viewId,
          name: data.name,
          createDate: data.createDate,
          authorId: data.authorId,
          location: data.location,
          status: data.status,
          images: data.images,
          description: data.description
        } as PropositionModel;
      }, error => {
        console.log('Error loading proposition');
      });
  }

  isActive(): boolean {
      return (this.proposition.status === 1);
  }

}
