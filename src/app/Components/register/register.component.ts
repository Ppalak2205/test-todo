import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from '../../interceptors/api.interceptor';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  // fullName: string = '';
  // email: string = '';
  // username: string = '';
  // password: string = '';
  // confirmPassword: string = '';
  // errorMessage: string = '';

  // constructor(private authService: AuthService, private router: Router) { }

  // register() {
  //   if (this.password !== this.confirmPassword) {
  //     this.errorMessage = "Passwords do not match!";
  //     return;
  //   }

  //   const user = {
  //     fullName: this.fullName,
  //     email: this.email,
  //     username: this.username,
  //     password: this.password
  //   };

  //   this.authService.register(user).subscribe(
  //     response => {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Registration Successful',
  //         text: 'You can now log in.',
  //         confirmButtonText: 'OK'
  //       }).then(() => {
  //         this.router.navigate(['/login']);
  //       });
  //     },
  //     error => {
  //       const errorMessage = error.error || 'Registration failed. Please try again.';
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Registration Failed',
  //         text: errorMessage,
  //         confirmButtonText: 'OK'
  //       });
  //     }
  //   );
  // }

  fullName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match!";
      return;
    }

    const user = {
      fullName: this.fullName,
      email: this.email,
      username: this.username,
      password: this.password
    };

    this.authService.register(user).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You can now log in.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error => {
        const errorMessage = error.error || 'Registration failed. Please try again.';
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: errorMessage,
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
