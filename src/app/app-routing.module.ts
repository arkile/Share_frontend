import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MainPageComponent} from './main-page/main-page.component';
import {PropositionFormComponent} from './proposition-form/proposition-form.component';
import {PropositionComponent} from './proposition/proposition.component';
import {RegistrationFormComponent} from './registration-form/registration-form.component';
import {LoginFormComponent} from './login-form/login-form.component';


const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'main-menu', component: MainPageComponent},
  {path: 'main-page', component: MainPageComponent},
  {path: 'new-proposition', component: PropositionFormComponent},
  {path: 'view-proposition', component: PropositionComponent},
  {path: 'registration', component: RegistrationFormComponent},
  {path: 'login', component: LoginFormComponent},
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
