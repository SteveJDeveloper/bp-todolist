import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getTasks() {
    return this.httpClient.get('https://bp-todolist.herokuapp.com/?id_author=5')
      .pipe(
        map((response:any) => {
          return response.data.map((task:any) => {
            return {
              id: task.id,
              description: task.description,
              status: task.status,
              id_author: task.id_author,
              finish_at: task.finish_at,
            }
          })
        })
    );
  }

  newTask(data:any){
    return this.httpClient.post('https://bp-todolist.herokuapp.com/?id_author=5', data);
  }

  updateTask(id:number, data:any){
    return this.httpClient.put('https://bp-todolist.herokuapp.com/'+id, data);
  }

  deleteTask(id:number){
    return this.httpClient.delete('https://bp-todolist.herokuapp.com/'+id);
  }
}
