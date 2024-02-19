import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Subject } from '../models/subject';
import { SubjectRequest } from '../models/subjectRequest';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-admin-subjects',
  templateUrl: './admin-subjects.component.html',
  styleUrls: ['./admin-subjects.component.css'],
})
export class AdminSubjectsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.getAllSubjectRequests().subscribe((data) => {
      this.subjectRequests = data;
    });
  }

  newSubject: string = '';
  subjectRequests: SubjectRequest[] = [];

  addNewSubject() {
    const subj = new Subject();
    subj.subject = this.newSubject;
    this.authService.newSubject(subj).subscribe();
  }

  approve(subject: SubjectRequest) {
    const newSubj = new Subject();
    newSubj.subject = subject.subject;
    this.userService.getUser(subject.teacherUsername).subscribe((user) => {
      user.subjects.push(subject.subject);
      this.userService.update(user).subscribe(() => {
        this.authService.newSubject(newSubj).subscribe(() => {
          this.authService.deleteSubjectRequest(subject.subject).subscribe();
        });
      });
    });
  }

  reject(subject: string) {
    let index = this.subjectRequests.findIndex((e) => e.subject == subject);
    this.subjectRequests.splice(index, 1);
    this.authService.deleteSubjectRequest(subject).subscribe();
  }
}
