import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Handles the login process by calling the AuthService.
   */
  login() {
    this.isLoading = true;
    this.errorMessage = '';
  
    this.authService.login(this.email, this.password).subscribe({
      next: (client) => {
        console.log('Login successful:', client); // Debug successful login
        this.isLoading = false;
        this.router.navigate(['/tabs/profile']);
      },
      error: (error) => {
        console.error('Login error details:', error.message); // Log detailed error
        this.isLoading = false;
        this.errorMessage =
          error.message === 'Invalid credentials'
            ? 'Invalid email or password. Please try again.'
            : 'An error occurred. Please try again.';
      },
    });
  }
}
