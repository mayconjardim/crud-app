import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  host: string = environment.apiUrl;
  private token!: string;
  private logginInUsername!: string;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(user: User): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.http.post<HttpResponse<any> | HttpErrorResponse>(
      `${this.host}/user/login`,
      user,
      { observe: 'response' }
    );
  }

  register(user: User): Observable<User | HttpErrorResponse> {
    return this.http.post<User | HttpErrorResponse>(
      `${this.host}/user/login`,
      user
    );
  }

  saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  addUserLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserLocalCache(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  loadToken(): void {
    this.token = localStorage.getItem('token')!;
  }

  getToken(): string {
    return this.token;
  }

  isLoggedIn(): boolean {
    this.loadToken();
    const decodedToken = this.jwtHelper.decodeToken(this.token);
    const username = decodedToken?.sub;
    if (username && !this.jwtHelper.isTokenExpired(this.token)) {
      this.logginInUsername = username;
      return true;
    } else {
      this.logout();
      return false;
    }
  }

  logout(): void {
    this.token = '';
    this.logginInUsername = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }
}
