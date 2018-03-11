import { Injectable } from '@angular/core';
import { Headers,RequestOptions} from '@angular/http';
import {HttpClient} from '@angular/common/http'
import 'rxjs/add/operator/map';
import {Task} from './task';

@Injectable()
export class TaskService {

  constructor(private http:HttpClient) {
  console.log('Task Service Initialized...'); }

  getTasks()
  {
    return this.http.get('http://localhost:3000/api/tasks').map(res:Response => res.json(), err => console.log(err));
  }

  addTask(newTask){
    return this.http.post('http://localhost:3000/api/task',newTask).map(res,:Response => res.json());
  }

  deleteTask(id){
    return this.http.delete('http://localhost:3000/api/task'+id).map(res,:Response => res.json());
  }

  updateStatus(task){
      return this.http.put('http://localhost:3000/api/task'+task._id,task).map(res,:Response => res.json());
  }
}
