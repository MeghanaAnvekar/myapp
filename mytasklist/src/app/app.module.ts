import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';

import {DashboardComponent} from './dashboard/dashboard.component'
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


const appRoutes:Routes =[
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AlertModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
