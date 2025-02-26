import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoItem } from '../Models/TodoItem';
import { TodoService } from '../../Services/todo.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { ChatService } from '../../Services/chat-service.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './todo-dialog.component.html',
  styleUrl: './todo-dialog.component.css'
})
export class TodoDialogComponent {

  messages: { sender: string, text: string }[] = [];
  newMessage: string = '';
  readOnly: boolean = false; 
  todoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public task: TodoItem,
    private todoService: TodoService,
    private chatService: ChatService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.readOnly = data.readOnly; // Get readOnly flag from data

    // Initialize form
    this.todoForm = new FormGroup({
      title: new FormControl({ value: data.title, disabled: this.readOnly }),
      description: new FormControl({ value: data.description, disabled: this.readOnly }),
      dueDate: new FormControl({ value: data.dueDate, disabled: this.readOnly })
  });
}

  saveEdit() {
    this.todoService.updateTodo(this.task).subscribe({
      next: (response) => {
        console.log('Response:', response);
        Swal.fire({
          title: 'Success!',
          text: 'Task updated successfully.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.dialogRef.close({ updated: true });
        });
      },
      error: (err) => {
        console.error('Error updating task:', err);
        Swal.fire({
          title: 'Error!',
          text: err?.error?.message || 'Failed to update task.',
          icon: 'error'
        });
      }
    });
  }

  deleteTask() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.deleteTodo(this.task.id!).subscribe({
          next: (response) => {
            console.log('Delete Response:', response);
            Swal.fire({
              title: 'Deleted!',
              text: response.message, 
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
              this.dialogRef.close({ deleted: true });
            });
          },
          error: (err) => {
            console.error('Error deleting task:', err);
            Swal.fire({
              title: 'Error!',
              text: err?.error?.message || 'Failed to delete task.',
              icon: 'error'
            });
          }
        });
      }
    });
  }
  
  ngOnInit() {
    this.readOnly = this.data.readOnly; // Read the flag
    this.loadChat();
    this.chatService.connect(this.task.id!);
    this.chatService.messageReceived.subscribe((message) => {
      this.messages.push(message);
    });
  }

  loadChat() {
    this.chatService.getChat(this.task.id!).subscribe({
      next: (data) => {
        this.messages = data;
      },
      error: (err) => console.error('Error loading chat:', err)
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    this.chatService.sendMessage(this.task.id!, this.newMessage);
    this.newMessage = '';
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
