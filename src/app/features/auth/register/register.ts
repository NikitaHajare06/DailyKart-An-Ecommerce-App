import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  isLoading = false;
  errorMessage = '';
  registerForm: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator() });
  }

  ngOnInit(): void {}

  passwordMatchValidator() {
    return (group: any) => {
      const password = group.get('password');
      const confirmPassword = group.get('confirmPassword');
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
      }
      return null;
    };
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { username, email, password } = this.registerForm.value;

    this.authService.register({ username, email, password }).subscribe({
      next: (res: { token: string }) => {
        this.isLoading = false;
        this.authService.saveToken(res.token);
        alert('Registration Successful');
        this.router.navigate(['/productlist']);
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }
}
