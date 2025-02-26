import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environment/environment';
import { TodoItem } from '../Components/Models/TodoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getTodos(): Observable<any> {
    const url = `${this.baseUrl}Todo`;
    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

    // Add a new Todo
    addTodo(todo: TodoItem): Observable<TodoItem> {
      const url = `${this.baseUrl}Todo`;
      return this.http.post<TodoItem>(url, todo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    }
  
    // Update an existing Todo
    updateTodo(todo: TodoItem): Observable<void> {
      const url = `${this.baseUrl}Todo/${todo.id}`;
      console.log(todo.id);
      return this.http.put<void>(url, todo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    }
  
    // Delete a Todo
    deleteTodo(id: number): Observable<void> {
      const url = `${this.baseUrl}Todo/${id}`;
      console.log(id);
      return this.http.delete<void>(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    } 

    // Toggle the completion status of a Todo
    toggleCompletion(id: number): Observable<{ message: string; isCompleted: boolean }> {
      const url = `${this.baseUrl}Todo/${id}/toggle-completion`;
      return this.http.patch<{ message: string; isCompleted: boolean }>(url, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    }    
}