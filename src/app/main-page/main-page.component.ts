import { Component, OnInit } from '@angular/core';
import {PROPOSITIONS} from '../mock-propositions';
import {Router} from '@angular/router';
import {PropositionModel} from '../models/proposition';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  propositions = PROPOSITIONS;
  listSize = 5;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.loadPropositions();
  }

  view_proposition(proposition: PropositionModel): void {
    this.router.navigate(['/view-proposition']);
    console.warn('Finish this');
  }

  private loadPropositions(): void {
    console.warn('Finish this');
  }

}

