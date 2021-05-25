import { Todo } from './../model/todo';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[];
  constructor() {
    this.todos = [
      {
        id: '111',
        title: 'todo 1',
        isCompleted: true,
        date: new Date()
      },
      {
        id: '222',
        title: 'todo 2',
        isCompleted: true,
        date: new Date()
      },
      {
        id: '333',
        title: 'todo 3',
        isCompleted: false,
        date: new Date()
      },

    ]
   }

   getTodos(){
     return of(this.todos); //observable
   }

   addTodo(todo: Todo){
      this.todos.push(todo);
   }

   changeStatus(todo: Todo){
     this.todos.map(singleTodo => {
       if(singleTodo.id === todo.id){
         todo.isCompleted = !todo.isCompleted;
       }
     })
   }

   deleteTodo(todo: Todo){
     const indexOfTodo = this.todos.findIndex(
       (currentObj) => currentObj.id === todo.id
     );
     this.todos.splice(indexOfTodo, 1);
   }
}
