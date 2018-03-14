import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import {UserService} from '../user.service';
import {Task } from '../task';
import { FormsModule } from '@angular/forms';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  //moduleId:module.id,
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
 temp :Object;
 tasks :any;
title : String;
date : Date;
_title : String;
_date : Date;
user: String;
update:Boolean;
 Tasks:any;
 id:any;
  constructor(private taskService: TaskService,private userService:UserService ) {
    this.user = this.userService.getUserName();
  //this.taskService.getTasks().subscribe(tasks => {this.temp = tasks; });

}

  ngOnInit() {
          this.taskService.getTasks(this.user).subscribe(t => {this.tasks = t});
          this.update=false;
        /*  for(var x in this.tasks)
          {
            this.Tasks.push(x);
          }*/

        /*  var tasks = this.tasks;
          if(tasks.length)
          {
            console.log('length of tasks');
              for(var i = 0;i < tasks.length;++i){
                if(tasks[i].username !== this.user){
                  tasks.splice(i,1);
                //  this.Tasks.splice(i,1);
                }

              }
          }*/
  }
  addTask(event){
          console.log('in addTask of dashboard');
          event.preventDefault();
if(this.title && this.date)
{
          var newTask = {
            username:this.user,
            title: this.title,
            date: this.date,
            isDone: false
                };

          this.taskService.addTask(newTask)
          .subscribe(task => {
            this.tasks.push(newTask);
            this.title ='';
          });
}
  }
  updateTask(event)
  {
    if(this._title && this._date)
    {
                var updatedtask = {
                  _id:this.id,
                  username:this.user,
                  title: this._title,
                  date: this._date,
                  isDone: false

                };
                this.update = true;
                console.log('in updateTask of dashboard');
                this.taskService.updateStatus(updatedtask)
                .subscribe(task => {
                  var tasks = this.tasks;
                  if(tasks.length)
                  {
                      for(var i = 0;i < tasks.length;++i){
                        if(tasks[i]._id == this.id){
                          tasks.splice(i,1);
                        //  this.Tasks.splice(i,1);
                        }

                      }
                  }
                  this.tasks.push(updatedtask);
                  //this.Tasks.push(updatedtask);

                  this.title ='';

                  this.update = false;
                });
            }
            else
            {
              this.update = false;
            }
  }

updateTrue($event,id)
{
        this.update = true;
        this.id=id;
}

  deleteTask(id){
    var tasks = this.tasks;
   var  temp : any;
    this.taskService.deleteTask(id).subscribe(data => {
 //this.taskService.deleteTask(id).map((data: Response) => data.json()).subscribe(data=>{
    temp = data;
      console.log(data);
      if(temp.n == 1)
      {
          for(var i = 0;i < tasks.length;++i){
            if(tasks[i]._id == id){
              tasks.splice(i,1);
            //  this.Tasks.splice(i,1);
            }

          }
      }
    });
  }

  updateStatus(task){
    var i =!task.isDone;
    console.log('isdone ...'+i);
    var _task = {
      _id:task._id,
      title:task.title,
      isDone: i,
      date: task.date,
      username:task.username
    };
console.log(_task);
    this.taskService.updateStatus(_task).subscribe(data =>{

      console.log(' in updateStatus ');
      console.log(data);

        /*this.tasks.push(task);
        for(var x in this.tasks)
        {
          this.Tasks.push(x);
        }*/
      task.isDone = !task.isDone;
    });
  }

}
