import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../../models/subject';
import { SubjectRequest } from 'src/app/models/subjectRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:4000/auth';

  register(user: User) {
    return this.http.post<User>(`${this.apiUrl}/signup`, user);
  }

  login(user: User) {
    return this.http.post<User>(`${this.apiUrl}/login`, user);
  }

  uploadPicture(formData: FormData) {
    return this.http.post<string>(`${this.apiUrl}/uploadPicture`, formData);
  }

  uploadCV(formData: FormData) {
    return this.http.post<string>(`${this.apiUrl}/uploadCV`, formData);
  }

  getAllSubjects() {
    return this.http.get<Subject[]>(`${this.apiUrl}/getAllSubjects`);
  }

  newSubject(subject: Subject) {
    const data = {
      subject: subject,
    };
    return this.http.post<any>(`${this.apiUrl}/newSubject`, data);
  }

  newSubjectRequest(subjectReq: SubjectRequest) {
    const data = {
      subject: subjectReq.subject,
      teacherUsername: subjectReq.teacherUsername,
    };
    return this.http.post<any>(`${this.apiUrl}/newSubjectRequest`, data);
  }

  getAllSubjectRequests() {
    return this.http.get<SubjectRequest[]>(
      `${this.apiUrl}/getAllSubjectRequests`
    );
  }

  getSubjectId(subject: string) {
    return this.http.post<string>(`${this.apiUrl}/getSubjectId`, {
      subject,
    });
  }
  deleteSubjectRequest(subject: string) {
    const data = {
      subject: subject,
    };

    return this.http.post<any>(`${this.apiUrl}/deleteSubjectRequest`, data);
  }
}
