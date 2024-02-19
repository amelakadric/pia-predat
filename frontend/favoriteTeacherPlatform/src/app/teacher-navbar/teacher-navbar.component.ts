import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-navbar',
  templateUrl: './teacher-navbar.component.html',
  styleUrls: ['./teacher-navbar.component.css'],
})
export class TeacherNavbarComponent {
  logout() {
    localStorage.clear();
  }
}
