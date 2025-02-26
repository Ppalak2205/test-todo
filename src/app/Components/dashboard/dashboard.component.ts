import { Component } from '@angular/core';
import { TodoService } from '../../Services/todo.service';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TodoListComponent,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  todos: any[] = [];
  date: Date | undefined;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
