import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import {Task } from '../task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
tasks : Task[];
title : String;
date : Date;
  constructor(private taskService: TaskService) {
  this.taskService.getTasks().subscribe(tasks => {this.tasks =tasks;});
}

  ngOnInit() {
  }

  addTask(event)
  {
    event.preventDefault();
    var newTask = {
      title: this.title,
      date: this.date,
      isDone: false

    }

    this.taskService.addTask(newTask)
    .subscribe(task => {
      this.tasks.push(task);
      this.title ='';
    })
  }

  deleteTask(id){
    var tasks = this.tasks;

    this.taskService.deleteTask(id).subscribe(data => {
      if(data.n == 1)
      {
          for(var i = 0;i < tasks.length;++i){
            if(tasks[i]._id == id){
              tasks.splice(i,1);
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
    };

    this.taskService.updateStatus(_task).subscribe(data =>{
      task.isDone = !task.isDone;
    });
  }

}
