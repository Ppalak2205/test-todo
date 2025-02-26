import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TodoItem } from '../Models/TodoItem';
import { TodoService } from '../../Services/todo.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from '../../interceptors/api.interceptor';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component'; // Import the dialog component

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

  newTask: string = '';
  todos: TodoItem[] = [];

  constructor(private todoService: TodoService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data.map((todo: TodoItem) => ({
        ...todo,
        isCompleted: todo.isCompleted === true 
      }));
    });
  }
  
  addTask() {
    if (this.newTask.trim()) {
      const newTodo = { title: this.newTask, isCompleted: false, isEditing: false } as TodoItem;
      this.todoService.addTodo(newTodo).subscribe((response) => {
        this.todos.push(response);
        this.newTask = '';
      });
    }
  }

  toggleCompletion(task: TodoItem, event: Event){
    event?.stopPropagation();
    task.isCompleted = !task.isCompleted;
    
    this.todoService.updateTodo(task).subscribe(() => {
      console.log('Task completion status updated:', task);
    });
  }
  

  toggleEditing(task: TodoItem) {
    task.isEditing = !task.isEditing;

    if (task.isEditing) {
      this.saveEdit(task);
    } else {
      this.todoService.updateTodo(task).subscribe(() => {
        console.log('Task editing mode toggled:', task);
      });
    }
  }


  // Delete a task
  deleteTask(index: number, event: Event) {
    event.stopPropagation();
    const task = this.todos[index];
    this.todoService.deleteTodo(task.id!).subscribe(() => {
      this.todos.splice(index, 1);
    });
  }

  // Save the edited task
  saveEdit(task: TodoItem) {
    this.todoService.updateTodo(task).subscribe(() => {
      task.isEditing = false;
    });
  }
  
  updateTask(task: TodoItem) {
    const updatedTask = {
      id: task.id,
      title: task.title,
      isCompleted: task.isCompleted, 
      isEditing: task.isEditing,
      userId: localStorage.getItem('nameid'),
      user: { id: localStorage.getItem('nameid') },
      isDeleted: false
    };
    console.log(updatedTask);
    this.todoService.updateTodo(updatedTask).subscribe(() => {
      console.log('Task updated successfully:', updatedTask);
    });
  }

  openTaskDialog(task: TodoItem) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '400px',
      data: { ...task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.updated || result?.deleted) {
        this.loadTodos();  // Refresh task list
      }
    });
  }



  @Input() todo: any[] = [];
}
