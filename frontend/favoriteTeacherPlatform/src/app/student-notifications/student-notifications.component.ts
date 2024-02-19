import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { LectureService } from '../services/lecture/lecture.service';
import { UserService } from '../services/user/user.service';
import { Lecture } from '../models/lecture';
import { Notification } from '../models/notification';

@Component({
  selector: 'app-student-notifications',
  templateUrl: './student-notifications.component.html',
  styleUrls: ['./student-notifications.component.css'],
})
export class StudentNotificationsComponent implements OnInit {
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
      console.log(this.user);

      this.lectureService
        .getNotifications(this.user._id)
        .subscribe((notifs) => {
          this.allNotifications = notifs;
          console.log(notifs);
        });
    });
  }

  user: User = new User();
  allLectures: Lecture[] = [];
  allNotifications: Notification[] = [];

  updateNotification(notification: Notification) {
    this.lectureService.updateNotification(notification).subscribe();
  }
}
