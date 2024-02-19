import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth/auth.service';

import * as bcrypt from 'bcryptjs';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css'],
})
export class ForgottenPasswordComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let u = localStorage.getItem('user');
    if (u) this.user = JSON.parse(u);
  }

  user: User = new User();
  error: string = '';
  option: string = '';

  oldPassword: string = '';
  newPassword: string = '';
  newPasswordRepeat: string = '';

  brandnewPassword: string = '';
  brandnewPasswordRepeat: string = '';

  answer: string = '';

  step1: boolean = true;
  step2: boolean = false;

  async newPasswordSubmit() {
    const isEqual = bcrypt.compare(this.oldPassword, this.user.password);
    if (!isEqual) {
      this.error = 'Old password is incorrect';
      return;
    }
    if (this.newPassword !== this.newPasswordRepeat) {
      this.error = 'New password isnt the same as repeat';
      return;
    }

    this.user.password = await bcrypt.hash(this.newPassword, 12);
    this.userService
      .update(this.user)
      .subscribe(() => this.router.navigate(['']));
  }

  safetyAnswer() {
    if (this.answer !== this.user.safetyAnswer) {
      this.error = 'Incorrect answer';
      return;
    }
    this.step2 = true;
    this.step1 = false;
  }

  async brandNewPassword() {
    if (this.brandnewPassword !== this.brandnewPasswordRepeat) {
      this.error = 'New password isnt the same as repeat';
      return;
    }
    const newPass = await bcrypt.hash(this.newPassword, 12);
    this.user.password = newPass;
    this.userService
      .update(this.user)
      .subscribe(() => this.router.navigate(['']));
  }
}
