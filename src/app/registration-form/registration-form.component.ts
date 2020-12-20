import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MessageService} from '../services/message-service';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {RegistrationModel} from '../models/registration-model';


export class RegistrationErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  registrationForm: FormGroup;
  errorMatcher = new RegistrationErrorStateMatcher();
  hide = true;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.register();
  }

  public register(): void {
    const registrationData = {
      name: this.registrationForm.get('name').value,
      email: this.registrationForm.get('email').value,
      phoneNumber: this.registrationForm.get('phoneNumber').value,
      password: this.registrationForm.get('password').value
    } as RegistrationModel;
    this.registrationForm.controls.name.disable();
    this.registrationForm.controls.email.disable();
    this.registrationForm.controls.phoneNumber.disable();
    this.registrationForm.controls.password.disable();
    this.messageService.register(registrationData).subscribe(data => {
      sessionStorage.setItem('token', data.accessToken);
      console.log('user registered');
      this.router.navigate(['main-page']);
    },
      error => {
        console.warn('REGISTRATION FAILED');
        console.warn(error);
        this.registrationForm.controls.name.enable();
        this.registrationForm.controls.email.enable();
        this.registrationForm.controls.phoneNumber.enable();
        this.registrationForm.controls.email.enable();
        this.registrationForm.controls.password.enable();
      });
  }


}
