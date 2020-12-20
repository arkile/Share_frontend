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

  propositions: PropositionModel[];
  listSize = 5;
  dataLoaded = false;
  defaultLocation =  [50.3413014, 30.5962901];
  location = this.defaultLocation;
  permissionGranted = false;
  myLat;
  myLong;

  constructor(private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.findMe();
    this.loadPropositions();
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
    this.messageService.loadPropositions(requestData).subscribe(data => {
      this.propositions = data.propositions;
      this.dataLoaded = true;
      console.log('data loaded');
    }, error => {
      console.warn('Loading propositions failed');
      console.warn(error);
    });
  }

  private findMe(): void {
    navigator.permissions.query(
      {name: 'geolocation'}
    ).then(permissionStatus => {
      if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt'){
        if (navigator.geolocation) {
          this.permissionGranted = true;
          navigator.geolocation.getCurrentPosition((position) => {
            this.myLat = position.coords.latitude;
            this.myLong = position.coords.longitude;
          });
        } else {
          alert('Geolocation is not supported by this browser.');
        }
      }
      else{
        this.permissionGranted = false;
        this.myLat = this.defaultLocation[0];
        this.myLong = this.defaultLocation[1];
      }
    });
    console.log(this.permissionGranted);
  }

}
