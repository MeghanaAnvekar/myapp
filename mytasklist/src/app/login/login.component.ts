import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../user';
import 'rxjs/add/operator/map';
import {Response_Status} from '../response_status';

@Component({
  //moduleId:module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
message : String;
showMessage: Boolean;
response :Object;

  constructor(private router:Router, private user:UserService) { }

  ngOnInit() {
     console.log('hit');
     this.showMessage = false;
  }
  loginUser(e) {
  	e.preventDefault();
  	console.log(e);
      var loginUser = {name:'',email:'',username:'',password:''};


    loginUser.username = e.target.elements[0].value;
  	loginUser. password = e.target.elements[1].value;
    loginUser.name='';
    loginUser.email='';

   this.user.getUser(loginUser).subscribe(data => {this.response = data;console.log(data);

  if( this.response == 200) {
    this.showMessage = false;
    this.user.setUserLoggedIn(loginUser.username);
    this.router.navigate(['dashboard']);
  }
  else
  {
    this.showMessage = true;
      this.message = 'Invalid username or password!';
  }


});

console.log(JSON.stringify(this.response));

  }


}
