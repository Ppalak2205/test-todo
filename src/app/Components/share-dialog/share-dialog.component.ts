import { Component, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-share-dialog',
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
  templateUrl: './share-dialog.component.html',
  styleUrl: './share-dialog.component.css'
})
export class ShareDialogComponent {

  shareEmail: string = '';

  constructor(
    public dialogRef: MatDialogRef<ShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { todoId: number },
    private todoService: TodoService
  ) {}
  
  shareTask() {
    if (!this.shareEmail.trim()) {
      Swal.fire('Error', 'Please enter an email address.', 'error');
      return;
    }
  
    if (!this.data.todoId) {
      Swal.fire('Error', 'Invalid task ID.', 'error');
      return;
    }
  
    this.todoService.shareTodo(this.data.todoId, this.shareEmail).subscribe({
      next: () => {
        Swal.fire('Success', 'Todo shared successfully.', 'success');
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error sharing todo:', error);
        Swal.fire('Error', error.error?.message || 'Failed to share todo.', 'error');
      }
    });
  }

  
  closeDialog() {
    this.dialogRef.close();
  }
}