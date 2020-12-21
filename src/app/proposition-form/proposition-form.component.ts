import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MessageService} from '../services/message-service';
import {Router} from '@angular/router';
import {NewPropositionModel} from '../models/new-proposition';

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
  lat = 50.408955;
  lon = 30.549316;

  imageUrl: string | ArrayBuffer = 'https://via.placeholder.com/480x320?text=Add+your+image+here';

  progress: number;
  infoMessage: any;
  isUploading = false;
  file: File;
  fileName: string;


  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // tslint:disable-next-line:typedef
  onChange(files) {
    const file = files[0];
    if (file) {
      this.fileName = file.name;
      this.file = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.imageUrl = reader.result;
        // this.imageBytes = reader.result;
        console.log(this.imageUrl);
      };
    }
  }

  // tslint:disable-next-line:typedef
  onSubmit(){
    this.createProposition();
  }

  // tslint:disable-next-line:typedef
  createProposition() {
    const loc = navigator.geolocation;
    const createData = {
      name: this.createForm.get('name').value,
      description: this.createForm.get('description').value,
      location: [this.lat, this.lon],
      images: this.imageUrl.toString()
    } as NewPropositionModel;
    this.createForm.controls.name.disable();
    this.createForm.controls.description.disable();
    this.messageService.createProposition(createData).subscribe(resp => {
      if (resp.status === 200 || resp.status === 201) {
        alert('Пропозиція вдало створена!');
        this.router.navigate(['/']);
        console.log('proposition created');
      }
    }, error => {
      if (error.status === 403){
        alert('Невірний аутентифікаційний код. Спробуйте ще раз');
        this.messageService.logOut();
      } else {
        console.error(error.error + ', status: ' + error.status);
        alert('Сталася помилка. спробуйте пізніше');
        this.messageService.logOut();
        console.warn('CREATING FAILED');
      }
      // this.createForm.controls.name.enable();
      // this.createForm.controls.description.enable();
      this.router.navigate(['main-page']);
    });
  }

  // tslint:disable-next-line:typedef
  private findMe() {
    navigator.permissions.query(
      {name: 'geolocation'}
    ).then(permissionStatus => {
      if (permissionStatus.state === 'granted'){
        if (navigator.geolocation) {
          // this.permissionGranted = true;
          navigator.geolocation.getCurrentPosition((position) => {
            this.lat = position.coords.latitude;
            this.lon = position.coords.longitude;
          });
        } else {
          alert('Geolocation is not supported by this browser.');
        }
      }
      else{
        // this.permissionGranted = false;
      }
    });
  }

}
