import { Component } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css'],
})
export class AdminStudentsComponent {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    let u = localStorage.getItem('user');
    if (u) this.user = JSON.parse(u);

    this.userService.getStudents().subscribe((da) => {
      if (da) {
        console.log(da);
        this.students = da;
      }
    });
  }

  user: User = new User();

  students: User[] = [];
}
