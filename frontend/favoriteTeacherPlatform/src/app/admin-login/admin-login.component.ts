import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  user: User = new User();
  error: string = '';

  login() {
    this.user.type = 'admin';
    this.authService.login(this.user).subscribe((data) => {
      if (data) {
        if (data.type != 'admin') {
          this.error = 'Wrong type!';
          return;
        }
        console.log('aa');
        localStorage.setItem('user', JSON.stringify(data));

        this.router.navigate(['admin']);
        return;
      }
    });
  }
}
