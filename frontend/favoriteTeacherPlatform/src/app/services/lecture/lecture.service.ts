import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lecture } from 'src/app/models/lecture';
import { Notification } from 'src/app/models/notification';
import { StudentInfo } from 'src/app/models/studentInfo';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class LectureService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:4000';

  createLecture(lecture: Lecture) {
    return this.http.post<Lecture>(`${this.apiUrl}/lectures/`, lecture);
  }
  createNotification(notification: Notification) {
    return this.http.post<Lecture>(
      `${this.apiUrl}/auth/createNotification`,
      notification
    );
  }

  updateNotification(notification: Notification) {
    const data = {
      viewed: notification.viewed,
      messageId: notification._id,
    };
    return this.http.post<Notification>(
      `${this.apiUrl}/auth/updateNotification/`,
      data
    );
  }

  getNotifications(userId: string) {
    return this.http.post<Notification[]>(
      `${this.apiUrl}/auth/getNotifications/`,
      {
        userId,
      }
    );
  }

  getStudentPastLectures() {
    return this.http.get<Lecture[]>(`${this.apiUrl}/users/lectures/past`);
  }

  getStudentUpcomingLectures() {
    return this.http.get<Lecture[]>(`${this.apiUrl}/users/lectures/upcoming`);
  }

  getTeachersUpcomingLectures(lecturesLimit: number) {
    return this.http.get<Lecture[]>(
      `${this.apiUrl}/teachers/upcoming-lectures`,
      { params: { lecturesLimit } }
    );
  }

  getTeachersLectureRequests() {
    return this.http.get<Lecture[]>(`${this.apiUrl}/teachers/lecture-requests`);
  }

  getAllLectures() {
    return this.http.get<Lecture[]>(`${this.apiUrl}/lectures/`);
  }

  teacherAcceptLecture({ lectureId }: { lectureId: string }) {
    return this.http.patch<Lecture>(
      `${this.apiUrl}/teachers/accept-lecture/${lectureId}`,
      {}
    );
  }

  completeLecture({ lectureId }: { lectureId: string }) {
    return this.http.patch<Lecture>(
      `${this.apiUrl}/lectures/complete-lecture/${lectureId}`,
      {}
    );
  }

  teacherRejectLecture({
    lectureId,
    rejectionReason,
  }: {
    lectureId: string;
    rejectionReason: string;
  }) {
    return this.http.patch<Lecture>(
      `${this.apiUrl}/teachers/reject-lecture/${lectureId}`,
      { rejectionReason }
    );
  }

  teacherCancelLecture({
    lectureId,
    cancelationReason,
  }: {
    lectureId: string;
    cancelationReason: string;
  }) {
    return this.http.patch<Lecture>(
      `${this.apiUrl}/teachers/cancel-lecture/${lectureId}`,
      { cancelationReason }
    );
  }

  getTeacherStudents() {
    return this.http.get<User[]>(`${this.apiUrl}/teachers/students`);
  }

  getStudentInfo(studentId: string) {
    return this.http.get<StudentInfo>(
      `${this.apiUrl}/teachers/students/student-info/${studentId}`
    );
  }

  rateTeacher({
    lectureId,
    professorRating,
    professorRateComment,
  }: {
    lectureId: string;
    professorRateComment: string;
    professorRating: number;
  }) {
    return this.http.post<Lecture>(
      `${this.apiUrl}/lectures/rate/${lectureId}`,
      { professorRateComment, professorRating }
    );
  }

  rateStudent({
    lectureId,
    studentRating,
    studentRateComment,
  }: {
    lectureId: string;
    studentRateComment: string;
    studentRating: number;
  }) {
    return this.http.post<Lecture>(
      `${this.apiUrl}/lectures/rate/student/${lectureId}`,
      { studentRateComment, studentRating }
    );
  }
}
