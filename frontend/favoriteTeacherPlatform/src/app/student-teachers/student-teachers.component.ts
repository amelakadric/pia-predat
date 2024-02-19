import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { LectureService } from '../services/lecture/lecture.service';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-student-teachers',
  templateUrl: './student-teachers.component.html',
  styleUrls: ['./student-teachers.component.css'],
})
export class StudentTeachersComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private lectureService: LectureService
  ) {}

  ngOnInit(): void {
    let u = localStorage.getItem('user');
    if (u) this.user = JSON.parse(u);
    this.userService.getUser(this.user.username).subscribe((data) => {
      this.user = data;
      this.userService.getActiveTeachers().subscribe((at) => {
        this.activeTeachers = at.filter((t) => {
          return t.ageWishes.includes(this.user.year);
        });
        this.lectureService.getAllLectures().subscribe((lectures) => {
          this.activeTeachers.forEach((t) => {
            let sum = 0;
            let numberOfRatings = 0;

            lectures.forEach((l) => {
              console.log(sum);

              if (l.professorId == t._id) {
                if (l.professorRating) {
                  console.log('tu');

                  sum += l.professorRating;
                  numberOfRatings++;
                }
              }
            });
            t.rating = sum / numberOfRatings;
          });
        });
      });
    });
  }

  activeTeachers: User[] = [];
  user: User = new User();

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

  searchFirstname: string = '';
  searchLastname: string = '';
  searchSubject: string = '';
}
