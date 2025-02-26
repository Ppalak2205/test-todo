import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    const credentials = { username: this.username, password: this.password };
  
    this.authService.login(credentials).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have been logged in successfully.',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
  
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);
  
        this.errorMessage = error.error?.message || 'Invalid username or password.';
  
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: this.errorMessage,
        });
      }
    });
  }
  
}
