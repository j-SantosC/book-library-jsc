import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service'; // Ajusta el path si es necesario

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.scss',
  imports: [CommonModule, FormsModule],
})
export class Register {
  username = '';
  email = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {}

  onRegister() {
    const body = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.authService.register(body).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/library']);
      },
      error: err => {
        console.error('Error en registro:', err);
        alert('Registro fallido. Intenta con otro email o revisa los campos.');
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
