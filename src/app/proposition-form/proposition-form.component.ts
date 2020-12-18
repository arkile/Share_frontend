import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proposition-form',
  templateUrl: './proposition-form.component.html',
  styleUrls: ['./proposition-form.component.css']
})
export class PropositionFormComponent implements OnInit {

  lat = 12;

  lng = 57;

  constructor() { }

  ngOnInit(): void {
  }

}
