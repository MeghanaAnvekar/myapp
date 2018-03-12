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
response :Object;
res_obj:Object;
  constructor(private router:Router, private user:UserService) { }

  ngOnInit() {
     console.log('hit');
  }
  loginUser(e) {
  	e.preventDefault();
  	console.log(e);
      var loginUser = {name:'',email:'',username:'',password:''};


    loginUser.username = e.target.elements[0].value;
  	loginUser. password = e.target.elements[1].value;
    loginUser.name='';
    loginUser.email='';

this.user.getUser(loginUser).subscribe(data => this.response = data);
/*for(var x in this.res_obj)
{
  this.response = x;
}*/console.log(JSON.stringify(this.response));
  	//if( this.response.status == 200) {
      this.user.setUserLoggedIn(loginUser.username);
  		this.router.navigate(['dashboard']);
  	//}
    //else
    {
        this.message = 'Invalid username or password!';
    }
  }


}
