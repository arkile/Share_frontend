import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MessageService} from '../services/message-service';
import {Router} from '@angular/router';

export class NewErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-proposition-form',
  templateUrl: './proposition-form.component.html',
  styleUrls: ['./proposition-form.component.css']
})
export class PropositionFormComponent implements OnInit {

  createForm: FormGroup;
  errorStateMatcher = new NewErrorStateMatcher();
  lat = 12;
  lng = 57;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({

    });
  }

  // tslint:disable-next-line:typedef
  onSubmit(){
    this.createProposition();
  }

  // tslint:disable-next-line:typedef
  createProposition() {

  }

}
