import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user';
import { Lecture } from '../models/lecture';
import { LectureService } from '../services/lecture/lecture.service';
import { Subject } from '../models/subject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private lectureService: LectureService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    const sevenDaysBeforeToday = new Date(today);
    const thirtyDaysBeforeToday = new Date(today);
    sevenDaysBeforeToday.setDate(today.getDate() - 7);
    thirtyDaysBeforeToday.setDate(today.getDate() - 30);

    this.userService.getStudents().subscribe((students) => {
      this.numberOfStudents = students.length;
      this.userService.getActiveTeachers().subscribe((at) => {
        this.activeTeachers = at;
        this.lectureService.getAllLectures().subscribe((lectures) => {
          lectures.forEach((lecture) => {
            let d = new Date(lecture.scheduledAt);
            if (d <= today && d >= sevenDaysBeforeToday) {
              this.lecturesLastWeek += 1;
            }
            if (d <= today && d >= thirtyDaysBeforeToday) {
              this.lecturesLastMonth += 1;
            }
          });

          this.authService.getAllSubjects().subscribe((subjects) => {
            this.allSubjects = subjects;
          });
        });
      });
    });
  }

  numberOfStudents: number = 0;
  numberOfTeachers: number = 0;
  activeTeachers: User[] = [];
  lecturesLastWeek: number = 0;
  lecturesLastMonth: number = 0;
  allSubjects: Subject[] = [];
  searchFirstname: string = '';
  searchLastname: string = '';
  searchSubject: string = '';

  get filteredTeachers(): any[] {
    return this.activeTeachers.filter((teacher) => {
      return (
        teacher.firstname
          .toLowerCase()
          .includes(this.searchFirstname.toLowerCase()) &&
        teacher.lastname
          .toLowerCase()
          .includes(this.searchLastname.toLowerCase()) &&
        (this.searchSubject === '' ||
          teacher.subjects.includes(this.searchSubject))
      );
    });
  }

  sortByFirstname(): void {
    this.activeTeachers.sort((a, b) => {
      if (a.firstname < b.firstname) return -1;
      if (a.firstname > b.firstname) return 1;
      return 0;
    });
  }

  sortByLastname(): void {
    this.activeTeachers.sort((a, b) => {
      if (a.lastname < b.lastname) return -1;
      if (a.lastname > b.lastname) return 1;
      return 0;
    });
  }

  register() {
    this.router.navigate(['register']);
  }
  login() {
    this.router.navigate(['login']);
  }
}
