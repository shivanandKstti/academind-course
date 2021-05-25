import { Todo } from './../../model/todo';
import { TodoService } from './../../service/todo.service';
import { Component, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  faTrashAlt = faTrashAlt;

  todos: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {

    this.todoService.getTodos().subscribe(todos =>{
      this.todos = todos;
    });
  }

  changeTodoStatus(todo: Todo){
    this.todoService.changeStatus(todo);
  }

  delete(todo: Todo){
    this.todoService.deleteTodo(todo);
  }

}
