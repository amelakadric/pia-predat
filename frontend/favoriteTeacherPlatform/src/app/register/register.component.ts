import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth/auth.service';
import { Subject } from '../models/subject';
import { SubjectRequest } from '../models/subjectRequest';
import { NumberClass } from '../models/util/numberClass';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getAllSubjects().subscribe((data) => {
      if (data) {
        this.availableSubjects = data;
      }
    });

    for (let i = 1; i < 9; i = i + 1) {
      if (i < 5) {
        this.newHSG.push(new NumberClass(i, false));
      }
      this.newESG.push(new NumberClass(i, false));
    }
  }

  availableSubjects: Subject[] = [];

  newUser: User = {
    _id: '',
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    type: 'student',
    username: '',
    profilePicture: '',
    gender: '',
    address: '',
    phoneNumber: '',
    safetyQuestion: '',
    safetyAnswer: '',
    isApproved: false,
    schoolType: '',
    year: 0,
    cv: '',
    subjects: [],
    ageWishes: [],
    heardAboutSite: '',
  };
  error: string = '';

  step: number = 1;

  profilePic: any;
  filePicture: any;
  fileCV: any;

  years: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  displayYears: number[] = this.years;
  highYears: number[] = [9, 10, 11, 12];

  newSubjectBool: boolean = false;
  newSubject: string = '';

  newHSG: NumberClass[] = [];
  newESG: NumberClass[] = [];
  passRegex =
    /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-+])[A-Za-z][A-Za-z0-9!@#$%^&*()-+]{5,9}$/;
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  setYears() {
    if (this.newUser.schoolType == 'elementaryschool') {
      this.displayYears = this.years;
    } else {
      this, (this.displayYears = this.highYears);
    }
  }
  print() {
    console.log(this.newUser.year);
  }

  validate() {
    if (
      this.newUser.email == '' ||
      this.newUser.username == '' ||
      this.newUser.password == '' ||
      this.newUser.firstname == '' ||
      this.newUser.lastname == '' ||
      this.newUser.gender == '' ||
      this.newUser.phoneNumber == '' ||
      this.newUser.address == '' ||
      this.newUser.safetyAnswer == '' ||
      this.newUser.safetyQuestion == ''
    ) {
      this.error = 'You must fill all the required fields';
      alert(this.error);

      return false;
    }
    if (this.newUser.type == 'student') {
      if (this.newUser.schoolType == '' || this.newUser.year == 0) {
        this.error = 'You must fill all the required fields';
        alert(this.error);

        return false;
      }
    }

    if (this.newUser.type == 'teacher') {
      if (
        this.newUser.cv == '' ||
        this.newUser.subjects.length == 0 ||
        this.newUser.subjects.length == 0 ||
        this.newUser.heardAboutSite == ''
      ) {
        this.error = 'You must fill all the required fields';
        alert(this.error);

        return false;
      }
    }
    if (!this.emailRegex.test(this.newUser.email)) {
      this.error = 'You must enter a valid email';
      alert(this.error);

      return false;
    }

    // if (!this.passRegex.test(this.newUser.password)) {
    //   this.error =
    //     'Password must have 6-10 characters, at least 1 uppercase letter, 3 lowercase letters, 1 number and 1 special character';
    //   alert(this.error);
    //   return false;
    // }
    return true;
  }

  uploadFile(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.filePicture = file;
      this.newUser.profilePicture = file.name;
    }
  }

  nextStep() {
    this.step = 2;
  }

  generateRange(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  removeSubject(subject: string) {
    if (this.newUser.subjects) {
      const index = this.newUser.subjects.indexOf(subject);
      if (index !== -1) {
        this.newUser.subjects.splice(index, 1);
      }
    }
  }

  checkNewSubject(subject: Subject) {
    if (subject.subject == 'Something else' && !subject.isChecked) {
      this.newSubjectBool = true;
    } else if (subject.subject == 'Something else' && subject.isChecked) {
      this.newSubjectBool = false;
    }
  }

  addNewSubject(subject: string) {
    // this.addSubject(subject);
    // if (!this.availableSubjects.includes(subject)) {
    // this.availableSubjects.push(subject);
    let newSubjreq = new SubjectRequest();
    newSubjreq.subject = subject;
    newSubjreq.teacherUsername = this.newUser.username;
    console.log('ovde');

    this.authService.newSubjectRequest(newSubjreq).subscribe();
    // this.authService.newSubject(subject).subscribe((s) => {});
    // }
  }

  addSubject(subject: string) {
    if (!this.newUser.subjects.includes(subject)) {
      this.newUser.subjects.push(subject);
      let s = new Subject();
      s.subject = subject;
    }
  }

  handleFileInput(event: any) {
    this.filePicture = event.target.files[0];
    const formData = new FormData();
    formData.append('profilePic', this.filePicture, this.filePicture.name);
    this.authService.uploadPicture(formData).subscribe((c) => {
      this.newUser.profilePicture = c;
    });
  }

  handleFileInputCV(event: any) {
    this.fileCV = event.target.files[0];
    const formData = new FormData();
    formData.append('cv', this.fileCV, this.fileCV.name);
    console.log(this.fileCV);
    this.authService.uploadCV(formData).subscribe((c) => {
      this.newUser.cv = c;
      console.log(c);
    });
  }

  async addCv(formData: FormData) {
    this.authService.uploadCV(formData).subscribe((c) => {
      this.newUser.cv = c;
    });
  }

  async addPic(formData: FormData) {
    this.authService.uploadPicture(formData).subscribe((c) => {
      this.newUser.profilePicture = c;
    });
  }
  async register() {
    let user = new User();

    if (this.newUser.type == 'teacher') {
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
      this.availableSubjects.forEach((s) => {
        if (s.subject !== 'Something else' && s.isChecked) {
          this.addSubject(s.subject);
        }
      });
    }

    const formData = new FormData();

    if (this.newUser.type == 'student') {
      this.newUser.isApproved = true;
    }
    if (!this.validate()) {
      return;
    }
    this.userService.getUser(this.newUser.username).subscribe((u) => {
      if (u) {
        if (u.username == this.newUser.username) {
          this.error = 'Username already exists';
        } else if (u.email == this.newUser.email) {
          this.error = 'Email already exists';
        }
      }
    });
    this.authService.register(this.newUser).subscribe(
      (data) => {
        if (data) {
          user = data;
          console.log(user);

          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['']);
          return;
        }
      },
      (err) => {
        this.error = err.error.message;
        console.log(err);
      }
    );
  }
}
