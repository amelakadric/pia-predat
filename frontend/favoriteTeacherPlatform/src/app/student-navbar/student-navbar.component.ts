import { Component } from '@angular/core';

@Component({
  selector: 'app-student-navbar',
  templateUrl: './student-navbar.component.html',
  styleUrls: ['./student-navbar.component.css'],
})
export class StudentNavbarComponent {
  logout() {
    localStorage.clear();
  }
}
