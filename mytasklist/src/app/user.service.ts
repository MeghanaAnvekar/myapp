import { Injectable } from '@angular/core';
import { Headers,RequestOptions} from '@angular/http';
import {HttpClient} from '@angular/common/http'
import 'rxjs/add/operator/map';

import { User }  from './user';
import { Observable } from 'rxjs/Observable';
import {Response_Status} from './response_status';

@Injectable()
export class UserService {
  private  isUserLoggedIn;
    public username;
    responseStatus: number;

  constructor(private http:HttpClient) {
  console.log('User Service Initialised...');
  this.isUserLoggedIn = false;
 }

 setUserLoggedIn(username) {
  	this.isUserLoggedIn = true;
    this.username = username;
  }

  getUserLoggedIn() {
  	return this.isUserLoggedIn;
  }
  getUserName()
  {
    return this.username;
  }
 getUser(user)
 {
   //var headers = new Headers();
  // headers.append('Content-Type','application/json');
   var temp = {
     username : user.username,
     name:user.name,
     email:user.email,
     password:user.password
   };

  var username:String;


   /*return this.http.post('http://localhost:3000/login',temp,{headers: headers},catch(this.handleError)
      .subscribe(
       (data) => console.log(data)
    );*/

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/user/login', {
      username : user.username,
      name:user.name,
      email:user.email,
      password:user.password
    })/*.map((response: Response) => {
      this.responseStatus = response.status;
      return this.extractData(response);
    }
    subscribe(
       (data:any) => {console.log(data); }
    )*/;

 }


 addUser(user)
 {
  // var headers = new Headers();
  // headers.append('Content-Type','application/json');
  // return this.http.post('http://localhost:3000/login',user,{headers: headers});
  console.log("in add user...."+user.name +"");
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
   return this.http.post('http://localhost:3000/user/register', {
     username : user.username,
     name:user.name,
     email:user.email,
     password:user.password
   }).subscribe(
      (data:any) => {console.log(data);return data;}
   );
 }
}
