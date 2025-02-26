// import { Component, Input } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { CommonModule } from '@angular/common';
// import { TodoItem } from '../Models/TodoItem';
// import { TodoService } from '../../Services/todo.service';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { ApiInterceptor } from '../../interceptors/api.interceptor';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component'; // Import the dialog component
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-todo-list',
//   standalone: true,
//   imports: [
//     MatCardModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatIconModule,
//     FormsModule,
//     CommonModule,
//     MatDialogModule
//   ],
//   providers: [
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: ApiInterceptor,
//       multi: true
//     }
//   ],
//   templateUrl: './todo-list.component.html',
//   styleUrl: './todo-list.component.css'
// })
// export class TodoListComponent {

//   newTask: string = '';
//   todos: TodoItem[] = [];
//   filteredTodos: TodoItem[] = [];
//   activeFilter: string = 'all';
//   constructor(private todoService: TodoService, private dialog: MatDialog) { }

//   ngOnInit() {
//     this.loadTodos();
//   }

//   loadTodos() {
//     this.todoService.getTodos().subscribe((data) => {
//       this.todos = data.map((todo: TodoItem) => ({
//         ...todo,
//         isCompleted: todo.isCompleted === true
//       }));
//       this.filterTasks('all');
//     });
//   }
  
  
//   addTask() {
//     if (this.newTask.trim()) {
//       const newTodo = { title: this.newTask, isCompleted: false, isEditing: false } as TodoItem;
//       this.todoService.addTodo(newTodo).subscribe((response) => {
//         this.todos.push(response);
//         this.newTask = '';
//         this.filterTasks('all');
//       });
//     }
//   }

//   // toggleCompletion(task: TodoItem, event: Event){
//   //   event?.stopPropagation();
//   //   task.isCompleted = !task.isCompleted;
    
//   //   this.todoService.updateTodo(task).subscribe(() => {
//   //     console.log('Task completion status updated:', task);
//   //     this.filterTasks('all'); // Refresh the filtered list
//   //   });
//   // }
//   toggleCompletion(task: TodoItem, event: Event) {
//     event?.stopPropagation();
  
//     Swal.fire({
//       title: 'Are you sure?',
//       text: `Do you want to mark this task as ${task.isCompleted ? 'Pending' : 'Completed'}?`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, change it!',
//       cancelButtonText: 'Cancel'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         task.isCompleted = !task.isCompleted;
  
//         this.todoService.updateTodo(task).subscribe(() => {
//           console.log('Task completion status updated:', task);
//           const index = this.todos.findIndex(t => t.id === task.id);
//           if (index !== -1) {
//             this.todos[index] = { ...task };
//           }
//           this.filterTasks(this.activeFilter);
//         });
//       }
//     });
//   }
  
  
//   toggleEditing(task: TodoItem) {
//     task.isEditing = !task.isEditing;

//     if (task.isEditing) {
//       this.saveEdit(task);
//     } else {
//       this.todoService.updateTodo(task).subscribe(() => {
//         console.log('Task editing mode toggled:', task);
//       });
//     }
//   }

//   deleteTask(index: number, event: Event) {
//     event.stopPropagation();
    
//     const task = this.todos[index];
  
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You won\'t be able to revert this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.todoService.deleteTodo(task.id!).subscribe(() => {
//           this.loadTodos();
//           this.todos.splice(index, 1);
//           Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
//           this.filterTasks('all');
//         });
//       }
//     });
//   }
  
//   saveEdit(task: TodoItem) {
//     this.todoService.updateTodo(task).subscribe(() => {
//       task.isEditing = false;
//     });
//   }
  
//   updateTask(task: TodoItem) {
//     const updatedTask = {
//       id: task.id,
//       title: task.title,
//       isCompleted: task.isCompleted, 
//       isEditing: task.isEditing,
//       userId: localStorage.getItem('nameid'),
//       user: { id: localStorage.getItem('nameid') },
//       isDeleted: false
//     };
//     console.log(updatedTask);
//     this.todoService.updateTodo(updatedTask).subscribe(() => {
//       console.log('Task updated successfully:', updatedTask);
//     });
//   }

//   openTaskDialog(task: TodoItem) {
//     const dialogRef = this.dialog.open(TodoDialogComponent, {
//       width: '400px',
//       data: { ...task }
//     });
  
//     dialogRef.afterClosed().subscribe(result => {
//       if (result?.updated || result?.deleted) {
//         this.loadTodos();
//       }
//     });
//   }



//   filterTasks(filter: string) {
//     this.activeFilter = filter;
  
//     if (filter === 'all') {
//       this.filteredTodos = this.todos; // ✅ Ensure it updates from `this.todos`
//     } else if (filter === 'completed') {
//       this.filteredTodos = this.todos.filter(task => task.isCompleted === true);
//     } else if (filter === 'pending') {
//       this.filteredTodos = this.todos.filter(task => task.isCompleted === false);
//     }
//   }  

//   @Input() todo: any[] = [];
// }
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component'; // Import the dialog component
import Swal from 'sweetalert2';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';

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
  filteredTodos: TodoItem[] = [];
  activeFilter: string = 'all';
  shareEmail: string = '';
  selectedTodo: TodoItem | null = null; 
  task: any;
  selectedTask: TodoItem | null = null;
  currentUserEmail = localStorage.getItem('userEmail');
  constructor(private todoService: TodoService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data.map((todo: TodoItem) => ({
        ...todo,
        isShared: todo.isShared || false,
        isCompleted: todo.isCompleted === true
      }));
      this.filterTasks('all');
    });
  }

  openViewDialog(task: TodoItem, event: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '400px',
      data: { ...task, viewMode: true } // Pass viewMode flag
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.selectedTask = null; // Reset selection after closing
    });
  }
  

  selectTask(task: TodoItem) {
    this.selectedTask = task;
  }
  
  addTask() {
    if (this.newTask.trim()) {
      const newTodo = { title: this.newTask, isCompleted: false, isEditing: false } as TodoItem;
      this.todoService.addTodo(newTodo).subscribe((response) => {
        this.todos.push(response);
        this.newTask = '';
        this.filterTasks('all');
      });
    }
  }

  toggleCompletion(task: TodoItem, event: Event) {
    event?.stopPropagation();

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to mark this task as ${task.isCompleted ? 'Pending' : 'Completed'}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        task.isCompleted = !task.isCompleted;

        this.todoService.updateTodo(task).subscribe(() => {
          console.log('Task completion status updated:', task);
          const index = this.todos.findIndex(t => t.id === task.id);
          if (index !== -1) {
            this.todos[index] = { ...task };
          }
          this.filterTasks(this.activeFilter);
        });
      }
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

  deleteTask(index: number, event: Event) {
    event.stopPropagation();

    const task = this.todos[index];

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.deleteTodo(task.id!).subscribe(() => {
          this.loadTodos();
          this.todos.splice(index, 1);
          Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
          this.filterTasks('all');
        });
      }
    });
  }

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
        this.loadTodos();
      }
    });
  }
  // openTaskViewDialog(task: TodoItem) {
  //   const dialogRef = this.dialog.open(TodoDialogComponent, {
  //     width: '400px',
  //     data: { ...task }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result?.updated || result?.deleted) {
  //       this.loadTodos();
  //     }
  //   });
  // }
  openTaskViewDialog(task: TodoItem) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '400px',
      data: { ...task, readOnly: true } // Pass readOnly mode
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result?.updated || result?.deleted) {
        this.loadTodos();
      }
    });
  }
  
  // openTaskViewDialog(task: TodoItem) {
  //   const dialogRef = this.dialog.open(TodoDialogComponent, {
  //     width: '400px',
  //     data: { ...task, readOnly: true }
  //   });
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result?.updated || result?.deleted) {
  //       this.loadTodos();
  //     }
  //   });
  // }
  

  filterTasks(filter: string) {
    this.activeFilter = filter;

    if (filter === 'all') {
      this.filteredTodos = this.todos;
    } else if (filter === 'completed') {
      this.filteredTodos = this.todos.filter(task => task.isCompleted === true);
    } else if (filter === 'pending') {
      this.filteredTodos = this.todos.filter(task => task.isCompleted === false);
    }
  }

  openShareDialog(task: TodoItem, event: Event) {
    event.stopPropagation();
    this.dialog.open(ShareDialogComponent, {
      width: '400px',
      data: { todoId: task.id }
    });
  }
  

  @Input() todo: any[] = [];
}