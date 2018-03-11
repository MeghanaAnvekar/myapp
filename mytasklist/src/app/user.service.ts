import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { User }  from './user';

@Injectable()
export class UserService {

  constructor(private http:Http) {
  console.log('User Service Initialised...');
 }

 getUser(user)
 {
   var headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.post('http://localhost:3000/login',JSON.objectify(user),{headers: headers})
   .map(res => res.json());
 }
}
