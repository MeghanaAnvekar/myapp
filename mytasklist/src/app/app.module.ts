import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import {HttpClientModule} from '@angular/common/http'
import { NguiPopupModule } from '@ngui/popup';
import { FormsModule } from '@angular/forms';

import {DashboardComponent} from './dashboard/dashboard.component'
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {UserService} from './user.service';
import {TaskService} from './task.service';
import { TaskComponent } from './task/task.component';

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
    component:DashboardComponent,
    children: [
      { path: 'home', redirectTo: '', pathMatch: 'full' }]
  }
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    TaskComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AlertModule.forRoot(),
    HttpClientModule,
    FormsModule

  ],
  providers: [UserService,TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
