import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ValidacionService } from 'src/app/services/validacion.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  tasks: any[] = [];

  newTask = {
    description: "",
    status: 0,
    id_author: 5,
    finish_at: "2022-06-03T21:47:23.000Z"
  };

  error: boolean = false;

  doneTasks: number = 0;

  constructor(
    private taskService: TaskService,
    private validacionService: ValidacionService
  ) {
    this.getTasks();
   }

  ngOnInit(): void {
  }

  getTasks(){
    this.taskService.getTasks().subscribe( response => {
      this.tasks = response;
      let taskSucces = this.tasks.filter(function(item){
        return item.status == 1;
      });
      this.doneTasks = taskSucces.length;
    })
  }

  saveTask(){
    if(this.validacionService.validarTarea(this.newTask.description)){
      this.taskService.newTask(this.newTask).subscribe(response => {
        this.getTasks();
      })
      this.newTask.description = "";
      this.error = false; 
    }else{
      this.error = true;
    }
  }

  updateTask(task: any){
    if(task.status == 1){
      task.status = 0;
    }else{
      task.status = 1;
    }
    this.taskService.updateTask(task.id, task).subscribe(response =>{
      this.getTasks();
    });
  }

  deleteTask(id: number){
    this.taskService.deleteTask(id).subscribe(response => {
      this.getTasks();
    })

  }
}
