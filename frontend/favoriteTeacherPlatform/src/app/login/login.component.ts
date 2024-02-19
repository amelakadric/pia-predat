import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  user: User = new User();
  error: string = '';

  forgottenPass() {
    this.userService.getUser(this.user.username).subscribe((u) => {
      console.log(u);
      localStorage.setItem('user', JSON.stringify(u));
      this.router.navigate(['newPassword']);
    });
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['home']);
  }

  login() {
    this.authService.login(this.user).subscribe(
      (data) => {
        if (data) {
          localStorage.setItem('user', JSON.stringify(data));
          this.user = data;
          if (this.user.type == 'student') {
            this.router.navigate(['student']);
          } else if (this.user.type == 'teacher') {
            if (!this.user.isApproved) {
              this.error = 'User is not approved by admin';
              this.user.password = '';
              return;
            }
            this.router.navigate(['teacher']);
          }
        }
      },
      (err) => {
        this.error = 'Bad user credentials';
      }
    );
  }
}
