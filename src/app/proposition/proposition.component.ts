import { Component, OnInit } from '@angular/core';
import {PropositionModel} from '../models/proposition';
import {PROPOSITIONS} from '../mock-propositions';

@Component({
  selector: 'app-proposition',
  templateUrl: './proposition.component.html',
  styleUrls: ['./proposition.component.css']
})
export class PropositionComponent implements OnInit {

  proposition = PROPOSITIONS[0];
  lat = 12;

  lng = 57;

    constructor() { }

  ngOnInit(): void {
      console.warn(localStorage.getItem('token'));
  }

}
