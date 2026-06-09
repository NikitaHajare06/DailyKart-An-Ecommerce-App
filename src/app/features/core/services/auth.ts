import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl =
    'https://fakestoreapi.com/auth/login';

  constructor(
    private http: HttpClient
  ) {}

  login(data: any): Observable<any> {
    const usersJson = localStorage.getItem('registeredUsers');
    const users = usersJson ? JSON.parse(usersJson) : [];
    const existingUser = users.find((user: any) =>
      user.username === data.username && user.password === data.password
    );

    if (existingUser) {
      return of({ token: 'mock-token-' + Date.now() });
    }

    return this.http.post<any>(
      this.loginUrl,
      data
    );
  }

  register(data: any): Observable<any> {
    const usersJson = localStorage.getItem('registeredUsers');
    const users = usersJson ? JSON.parse(usersJson) : [];

    const existingUser = users.find((user: any) => user.username === data.username);
    if (existingUser) {
      return throwError(() => new Error('User already exists'));
    }

    users.push(data);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    return of({ token: 'mock-token-' + Date.now() });
  }

  saveToken(token: string) {

    localStorage.setItem(
      'token',
      token
    );
  }

  getToken() {

    return localStorage.getItem(
      'token'
    );
  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem(
      'token'
    );
  }

  logout() {

    localStorage.removeItem(
      'token'
    );
  }
}