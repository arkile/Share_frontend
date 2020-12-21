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
  location = this.geoService.defaultLocation;
  permissionGranted = false;
  myLat;
  myLong;


  constructor(private router: Router, private messageService: MessageService, private geoService: GeoLocationService) { }

  ngOnInit(): void {
    this.geoService.findMe().then(success => {

      this.location = [this.geoService.myLat, this.geoService.myLong];
      this.loadPropositions();
    });
  }

  // tslint:disable-next-line:typedef
  distanceTo(prop: PropositionModel) {
    const loc1 = prop.location;
    const loc2 = [this.location[0], this.location[1]];
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





}
