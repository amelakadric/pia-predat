import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let u = localStorage.getItem('user');
    if (u) this.user = JSON.parse(u);
    this.userService.getUser(this.user.username).subscribe((us) => {
      this.user = us;
      this.newUser = Object.assign({}, us);
      this.gradeOuput = this.newUser.year;
    });
  }

  user: User = new User();
  updateOpen: boolean = false;
  newUser: User = new User();
  gradeOuput: number = 0;
  newPic: any;

  openUpdate() {
    this.updateOpen = true;
  }

  handleFileInput(event: any) {
    this.newPic = event.target.files[0];
    const formData = new FormData();
    formData.append('profilePic', this.newPic, this.newPic.name);
    this.authService.uploadPicture(formData).subscribe((c) => {
      this.newUser.profilePicture = c;
    });
  }

  increment() {
    if (this.gradeOuput < 8 && this.newUser.schoolType == 'elementaryschool') {
      this.newUser.year++;
      this.gradeOuput++;
    } else if (this.newUser.year == 8) {
      this.newUser.schoolType = 'highschool';
      this.newUser.year = 9;
      this.gradeOuput = 1;
    } else if (
      this.newUser.year < 13 &&
      this.newUser.schoolType == 'highschool'
    ) {
      this.newUser.year++;
      this.gradeOuput++;
    }
  }

  updateStudent() {
    this.userService.update(this.newUser).subscribe(() => {
      console.log('User updated');
      location.reload();
    });
  }
}
