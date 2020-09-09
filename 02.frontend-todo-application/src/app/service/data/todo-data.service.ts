import { API_URL } from './../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../../list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http: HttpClient
  ) {
  }

  retrieveAllTodos(username) {
    return this.http.get<Todo[]>(`${API_URL}`);
    // console.log("Execute Hello World Bean Service")
  }

  deleteTodo(username, id) {
    return this.http.delete(`${API_URL}/${id}`);
  }

  retrieveTodo(username, id) {
    return this.http.get<Todo>(`${API_URL}/${id}`);
  }

  updateTodo(username, id, todo) {
    console.log(todo);
    return this.http.put(`${API_URL}/${id}`, todo);
  }

  createTodo(username, todo) {
    console.log(todo);
    return this.http.post(`${API_URL}`, todo);
  }

}
