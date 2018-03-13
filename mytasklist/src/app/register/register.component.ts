import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../user';
import { map } from "rxjs/operators";


@Component({
  moduleId:module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  message:String;
  showMessage:Boolean;
  constructor(private router:Router, private user:UserService) { }

  ngOnInit() {
     console.log('hit');
     this.showMessage = false;

  }
  registerUser(e) {
  	e.preventDefault();
  	console.log(e);
    var registerUser = {name:'',email:'',username:'',password:''};


    registerUser.name = e.target.elements[0].value;
    registerUser.email = e.target.elements[1].value;
    registerUser.username = e.target.elements[2].value;
  	registerUser. password = e.target.elements[3].value;
  console.log(registerUser.name+' '+registerUser.email);

  var status: any;
  this.user.addUser(registerUser).subscribe(data => {console.log(data);
    status = data;
    if( status !== 200)
    { this.showMessage = false;
      this.user.setUserLoggedIn(registerUser.name);
      this.router.navigate(['dashboard']);
    }
    else{
      this.showMessage = true;
        this.message = 'User already exists !';
    }
  });

  //	if( status === '404') {
    /*  this.user.addUser(registerUser).map(data => {console.log("I CAN SEE DATA HERE: ", data.json());
            return data.json();});*/
            //console.log(this.user.addUser(registerUser));
    /*  if( status === '200')
      {this.user.setUserLoggedIn(registerUser.username);*/

    //}*/
  	//}
    //else

  }
}
