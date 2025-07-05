import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [CommonModule, FormsModule],
})
export class Login {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const credentials = {
      username: this.username,
      password: this.password,
    };

    this.authService.login(credentials).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/library']);
      },
      error: err => {
        console.error('Error en login:', err);
        alert('Credenciales incorrectas o error del servidor.');
      },
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
