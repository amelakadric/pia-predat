import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LectureBySubject } from '../models/studentInfo';
import { User } from '../models/user';
import { LectureService } from '../services/lecture/lecture.service';
import { RateStudentModal } from '../services/modal/rate-student-modal.service';
import { UserService } from '../services/user/user.service';
import { Lecture } from '../models/lecture';
import { Subject } from '../models/subject';
import { Time } from 'highcharts';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-student-teacher-info',
  templateUrl: './student-teacher-info.component.html',
  styleUrls: ['./student-teacher-info.component.css'],
})
export class StudentTeacherInfoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private lectureService: LectureService,
    private userService: UserService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    let u = localStorage.getItem('user');
    if (u) this.user = JSON.parse(u);
    this.route.params.subscribe((params) => {
      const teacherId = params['teacherId'];
      this.setTeacherInfo(teacherId);
      this.lectureService.getAllLectures().subscribe((lecs) => {
        this.allLectures = lecs.filter((l) => {
          return (
            l.professorId == this.teacher?._id &&
            l.professorRateComment &&
            l.professorRating
          );
        });
      });
    });
  }
  setTeacherInfo(teacherId: string) {
    this.userService.getUser(teacherId).subscribe((t) => {
      this.teacher = t;
      if (this.teacher.subjects.length == 1) {
        this.selectedSubject = this.teacher.subjects[0];
      }
    });
  }
  user: User = new User();
  teacher: User = new User();
  allLectures: Lecture[] = [];
  doubleClass: boolean = false;
  scheduledDate: Date = new Date();
  selectedSubject: string = '';
  subj: Subject = new Subject();
  description: string = '';
  error: string = '';
  getSubject() {
    this.authService.getAllSubjects().subscribe((s) => {
      console.log(s);
      let sub = s.find((e) => {
        return e.subject == this.selectedSubject;
      });
      if (sub) this.subj = sub;
    });
  }

  sendRequest() {
    if (!this.selectedSubject) {
      this.error = 'Fill in the subject';
      return;
    }
    this.authService.getAllSubjects().subscribe((s) => {
      let sub = s.find((e) => {
        return e.subject == this.selectedSubject;
      });
      if (sub) this.subj = sub;

      let duration = this.doubleClass ? 90 : 45;
      let newLecture = new Lecture(
        '123',
        this.scheduledDate,
        duration,
        this.subj._id,
        this.teacher._id,
        this.user._id,
        false,
        this.teacher,
        this.subj,
        this.user
      );
      newLecture.studentComment = this.description;
      this.lectureService.createLecture(newLecture).subscribe((l) => {
        console.log(l);
        location.reload();
      });
    });
  }
}
