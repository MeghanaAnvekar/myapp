import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {TaskService} from '../task.service';
import {User} from '../user';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  //moduleId:module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

  export class DashboardComponent implements OnInit {

    tasks =[];
   title : String;
   date : Date;
   user: String;


  constructor(private taskService: TaskService,private userService:UserService) {
    this.user = this.userService.username;
    console.log('Is user logged in? ', this.userService.getUserLoggedIn());
     }

  ngOnInit() {

  }
  


}
