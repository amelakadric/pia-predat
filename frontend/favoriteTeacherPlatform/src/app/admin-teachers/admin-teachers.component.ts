import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user/user.service';
import { NumberClass } from '../models/util/numberClass';
import { AuthService } from '../services/auth/auth.service';
import { Subject } from '../models/subject';

@Component({
  selector: 'app-admin-teachers',
  templateUrl: './admin-teachers.component.html',
  styleUrls: ['./admin-teachers.component.css'],
})
export class AdminTeachersComponent {
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let u = localStorage.getItem('user');
    if (u) this.user = JSON.parse(u);

    this.userService.getTeachers().subscribe((da) => {
      if (da) {
        console.log(da);
        this.teachers = da.filter((t) => {
          return t.isApproved == true;
        });
      }
    });

    this.authService.getAllSubjects().subscribe((data) => {
      this.allSubjects = data;
    });
  }

  user: User = new User();

  teachers: User[] = [];

  newHSG: NumberClass[] = [];
  newESG: NumberClass[] = [];
  newPic: any;
  newCv: any;
  allSubjects: Subject[] = [];

  newUser: User = new User();
  showUpdate: boolean = false;

  selectTeacher(teacher: User) {
    this.showUpdate = true;
    this.newUser = teacher;
    this.newESG = [];
    this.newHSG = [];

    for (let i = 1; i < 9; i = i + 1) {
      if (teacher.ageWishes.includes(i)) {
        this.newESG.push(new NumberClass(i, true));
      } else {
        this.newESG.push(new NumberClass(i, false));
      }
    }
    for (let i = 9; i < 13; i = i + 1) {
      if (teacher.ageWishes.includes(i)) {
        this.newHSG.push(new NumberClass(i - 8, true));
      } else {
        this.newHSG.push(new NumberClass(i - 8, false));
      }
    }

    this.authService.getAllSubjects().subscribe((data) => {
      this.allSubjects = data;
      this.allSubjects.forEach((s) => {
        if (this.newUser.subjects.includes(s.subject)) {
          s.isChecked = true;
        } else {
          s.isChecked = false;
        }
      });
    });
  }

  viewCV(cvUrl: string) {
    window.open(cvUrl, '_blank');
  }

  async handleFileInput(event: any) {
    this.newCv = event.target.files[0];
    const formData = new FormData();
    formData.append('cv', this.newCv, this.newCv.name);
    this.authService.uploadCV(formData).subscribe((c) => {
      this.newUser.cv = c;
    });
  }

  handleFileInputCV(event: any) {
    this.newPic = event.target.files[0];
    const formData = new FormData();
    formData.append('cv', this.newPic, this.newPic.name);
    this.authService.uploadPicture(formData).subscribe((c) => {
      this.newUser.profilePicture = c;
    });
  }

  updateTeacher() {
    if (this.newUser) {
      if (confirm('Are you sure you want to update this teacher?')) {
        this.newUser.isApproved = true;

        let updateSubjects: string[] = [];
        let checkedSubjects = this.allSubjects.filter(
          (s) => s.isChecked == true
        );
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
          console.log('Teacher updated successfully');
          this.ngOnInit();
          location.reload();
        });
      }
    }
  }
  deactivateTeacher() {
    if (this.newUser) {
      if (confirm('Are you sure you want to deactivate this teacher?')) {
        this.newUser.isApproved = false;
        this.userService.update(this.newUser).subscribe(() => {
          console.log('Teacher deactivated successfully');
        });
      }
    }
  }
}
