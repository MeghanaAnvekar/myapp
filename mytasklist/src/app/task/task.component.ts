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
user: String;
update:Boolean;
 Tasks:any;
 id:any;
  constructor(private taskService: TaskService,private userService:UserService ) {
    this.user = this.userService.getUserName();
  this.taskService.getTasks().subscribe(tasks => {this.temp = tasks; });

}

  ngOnInit() {
          this.taskService.getTasks().subscribe(tasks => {this.tasks = tasks});
          this.update=false;
          for(var x in this.tasks)
          {
            this.Tasks.push(x);
          }
  }
  addTask(event){
          console.log('in addTask of dashboard');
          event.preventDefault();
          var newTask = {
            username:this.user,
            title: this.title,
            date: this.date,
            isDone: false
                };

          this.taskService.addTask(newTask)
          .subscribe(task => {
            this.tasks.push(task);
            this.title ='';
          });
  }
  updateTask(event)
  {
                var updatedtask = {
                  _id:this.id,
                  username:this.user,
                  title: this.title,
                  date: this.date,
                  isDone: false

                }
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
    var _task = {
      _id:task._id,
      title:task.title,
      isDone: !task.isDone
    }

    this.taskService.updateStatus(_task).subscribe(data =>{
      this.tasks = data;

        this.tasks.push(task);
        for(var x in this.tasks)
        {
          this.Tasks.push(x);
        }
      task.isDone = !task.isDone;
    });
  }

}
