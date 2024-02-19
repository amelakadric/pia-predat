import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:4000/users';

  getUser(user: string) {
    const data = {
      username: user,
    };
    return this.http.post<User>(`${this.apiUrl}/getUser`, data);
  }

  getAll() {
    return this.http.get<User[]>(`${this.apiUrl}/getAll`);
  }

  getRequestedUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/getRequestedUsers`);
  }

  getTeachers() {
    return this.http.get<User[]>(`${this.apiUrl}/getTeachers`);
  }
  getActiveTeachers() {
    return this.http.get<User[]>(`${this.apiUrl}/getActiveTeachers`);
  }

  getStudents() {
    return this.http.get<User[]>(`${this.apiUrl}/getStudents`);
  }

  update(user: User) {
    let data = {
      userId: user._id,
      userData: user,
    };
    return this.http.post<any>(`${this.apiUrl}/update`, data);
  }

  setApproved(user: User) {
    let data = {
      userId: user._id,
      isApproved: user.isApproved,
    };
    return this.http.post<any>(`${this.apiUrl}/setApproved`, data);
  }
}
