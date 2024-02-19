import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { Subject } from '../models/subject';
import { NumberClass } from '../models/util/numberClass';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent implements OnInit {
  ngOnInit(): void {
    let u = localStorage.getItem('user');
    if (u) this.user = JSON.parse(u);
    this.userService.getUser(this.user.username).subscribe((data) => {
      if (data) {
        console.log(data);

        this.user = data;
        this.elementaryGrades = this.user.ageWishes.filter((e) => e < 9);
        this.highschoolGrades = this.user.ageWishes.filter((e) => e > 8);
        this.highschoolGrades = this.highschoolGrades.map((e) => e - 8);
        this.newUser = Object.assign({}, this.user);

        for (let i = 1; i < 9; i = i + 1) {
          if (this.user.ageWishes.includes(i)) {
            this.newESG.push(new NumberClass(i, true));
          } else {
            this.newESG.push(new NumberClass(i, false));
          }
        }
        for (let i = 9; i < 13; i = i + 1) {
          if (this.user.ageWishes.includes(i)) {
            this.newHSG.push(new NumberClass(i - 8, true));
          } else {
            this.newHSG.push(new NumberClass(i - 8, false));
          }
        }

        this.authService.getAllSubjects().subscribe((data) => {
          this.allSubjects = data;
          this.allSubjects.forEach((s) => {
            if (this.user.subjects.includes(s.subject)) {
              s.isChecked = true;
            }
          });
        });
      }
    });
  }

  abandon() {
    this.updateProfile = false;
  }

  user: User = new User();
  newUser: User = new User();

  allSubjects: Subject[] = [];

  selectedTeacher: User = new User();
  updateProfile = false;
  pictureFile: File | undefined;
  elementaryGrades: number[] = [];
  highschoolGrades: number[] = [];

  newHSG: NumberClass[] = [];
  newESG: NumberClass[] = [];
  newPic: any;
  newCv: any;

  onProfilePictureChange(event: any) {}

  uploadProfilePicture() {}

  openUpdate() {
    this.updateProfile = true;
  }

  async handleFileInputCV(event: any) {
    this.newCv = event.target.files[0];
    const formData = new FormData();
    formData.append('cv', this.newCv, this.newCv.name);
    this.authService.uploadCV(formData).subscribe((c) => {
      this.newUser.cv = c;
      console.log(c);
    });
  }

  handleFileInput(event: any) {
    this.newPic = event.target.files[0];
    const formData = new FormData();
    formData.append('profilePic', this.newPic, this.newPic.name);
    this.authService.uploadPicture(formData).subscribe((c) => {
      this.newUser.profilePicture = c;
    });
  }

  updateTeacher() {
    let updateSubjects: string[] = [];
    let checkedSubjects = this.allSubjects.filter((s) => s.isChecked == true);
    checkedSubjects.forEach((e) => {
      updateSubjects.push(e.subject);
    });
    this.newUser.subjects = updateSubjects;

    let updateElem: number[] = [];
    this.newESG.forEach((e) => {
      if (e.isChecked) {
        updateElem.push(e.num);
      }
    });
    this.newHSG.forEach((e) => {
      if (e.isChecked) {
        updateElem.push(e.num + 8);
      }
    });
    this.newUser.ageWishes = updateElem;

    this.userService.update(this.newUser).subscribe(() => {
      console.log('User updated');
      location.reload();
    });
  }
  viewCV(cvUrl: string) {
    window.open(cvUrl, '_blank');
  }
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}
}
