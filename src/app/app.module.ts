import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from '../app/Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { TodoListComponent } from './Components/todo-list/todo-list.component';
import { AuthService } from './Services/auth.service';
import { TodoService } from './Services/todo.service';
import { AuthGuard } from './auth.guard';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileComponent } from './Components/profile/profile.component';
@NgModule({
    declarations: [
    ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    TodoListComponent,
    HttpClientModule,
    MatDialogModule,
    ProfileComponent
  ],
  providers: [AuthService, TodoService, AuthGuard],
})
export class AppModule { }