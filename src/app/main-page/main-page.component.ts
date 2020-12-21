import { Component, OnInit } from '@angular/core';
import {PROPOSITIONS} from '../mock-propositions';
import {Router} from '@angular/router';
import {PropositionModel} from '../models/proposition';
import {MessageService} from '../services/message-service';
import {ListRequestModel} from '../models/list-request-model';
import {GeoLocationService} from '../services/geoloc-service';


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

  constructor(private router: Router, private messageService: MessageService, private geoService: GeoLocationService) { }

  ngOnInit(): void {
    this.findMe();
    this.loadPropositions();
  }

  // tslint:disable-next-line:typedef
  distanceTo(prop: PropositionModel) {
    const loc1 = prop.location;
    const loc2 = [this.myLat, this.myLong];
    const d = this.geoService.haversineDistance(loc2, loc1);
    return d.toFixed();
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
    this.messageService.loadPropositions(requestData).subscribe(resp => {
      const data = resp.body;
      this.propositions = data.propositions;
      this.dataLoaded = true;
      console.log('data loaded');
    }, error => {
      console.warn('Loading propositions failed');
      this.messageService.handleError(error);
    });
  }

  private findMe(): void {
    navigator.permissions.query(
      {name: 'geolocation'}
    ).then(permissionStatus => {
      if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt'){
        console.log('in cycle');
        if (navigator.geolocation) {
          this.permissionGranted = true;
          navigator.geolocation.getCurrentPosition((position) => {
            this.myLat = position.coords.latitude;
            this.myLong = position.coords.longitude;
            console.log(this.myLat + ', ' + this.myLong);
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
