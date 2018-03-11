import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

  export class DashboardComponent implements OnInit {

  username :String;

  constructor(private user: UserService) { }

  ngOnInit() {
  	this.username = this.user.username;
  	console.log('Is user logged in? ', this.user.getUserLoggedIn())
  }

}
