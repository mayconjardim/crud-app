import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private host: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[] | HttpErrorResponse> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  addUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }

  updateUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/update`, formData);
  }

  resetPassword(email: string): Observable<any | HttpErrorResponse> {
    return this.http.get<User>(`${this.host}/user/resetpassword/${email}`);
  }

  updateProfileImage(
    formData: FormData
  ): Observable<HttpEvent<User> | HttpErrorResponse> {
    return this.http.post<User>(
      `${this.host}/user/updateprofileimage`,
      formData,
      { reportProgress: true, observe: 'events' }
    );
  }

  deleteUser(userId: number): Observable<any | HttpErrorResponse> {
    return this.http.delete<User>(`${this.host}/user/delete/${userId}`);
  }

  addUsersLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUsersLocalCache(): User[] {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users')!);
    }
    return null!;
  }

  createUserFormData(
    loggendInUsername: string,
    user: User,
    profileImage: File
  ): FormData {
    const formData = new FormData();
    formData.append('currentUserName', loggendInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('profileImage', user.profileImage);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isMonLocked', JSON.stringify(user.notLocked));
    return formData;
  }
}
