import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css'],
})
export class AdminRequestsComponent {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    let u = localStorage.getItem('user');
    if (u) this.user = JSON.parse(u);

    this.userService.getRequestedUsers().subscribe((data) => {
      if (data) {
        console.log(data);
        this.userRequests = data;
      }
    });
  }

  user: User = new User();
  userRequests: User[] = [];

  approve(user: User) {
    user.isApproved = true;

    this.userService.setApproved(user).subscribe((data) => {
      console.log(data);
      this.ngOnInit();
    });
  }

  reject(user: User) {
    user.isApproved = false;
    this.userService.setApproved(user).subscribe((data) => {
      console.log(data);
      this.ngOnInit();
    });
  }

  viewCV(cvUrl: string) {
    window.open(cvUrl, '_blank');
  }
}
