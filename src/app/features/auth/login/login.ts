import { Component } from '@angular/core';

import { CommonModule }
  from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink }
  from '@angular/router';

import { AuthService }
  from '../../core/services/auth';

@Component({

  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
    , RouterLink
  ],

  templateUrl: './login.html',

  styleUrls: ['./login.css']

})
export class LoginComponent {

  isLoading = false;

  errorMessage = '';

  loginForm: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;
    }

    this.isLoading = true;

    this.authService
      .login(this.loginForm.value)

      .subscribe({

        next: (res: { token: string }) => {

          this.isLoading = false;

          this.authService
            .saveToken(res.token);

          alert('Login Successful');

          this.router.navigate(['/productlist']);
        },

        error: () => {

          this.isLoading = false;

          this.errorMessage =
            'Invalid Username or Password';
        }

      });
  }
}