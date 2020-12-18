import { Component, OnInit } from '@angular/core';
import {MessageService} from '../services/message-service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  public authService: MessageService;

  constructor(private authServ: MessageService, private router: Router) {
    this.authService = authServ;
  }

  ngOnInit(): void {
  }

}
