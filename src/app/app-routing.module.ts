// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from '../app/Components/login/login.component';
// import { RegisterComponent } from './Components/register/register.component';
// import { AuthGuard } from './auth.guard';
// import { DashboardComponent } from './Components/dashboard/dashboard.component';

// const routes: Routes = [
//     { path: 'login', component: LoginComponent },
//     { path: 'register', component: RegisterComponent },
//     { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
//     { path: '', redirectTo: '/login', pathMatch: 'full' }
  
//   ];
  
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   providers: [AuthGuard],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }