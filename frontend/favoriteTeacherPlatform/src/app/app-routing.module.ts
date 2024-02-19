import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { AdminTeachersComponent } from './admin-teachers/admin-teachers.component';
import { AdminRequestsComponent } from './admin-requests/admin-requests.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { AdminSubjectsComponent } from './admin-subjects/admin-subjects.component';
import { TeacherLecturesComponent } from './teacher-lectures/teacher-lectures.component';
import { TeacherStudentsComponent } from './teacher-students/teacher-students.component';
import { StudentTeachersComponent } from './student-teachers/student-teachers.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { TeacherStudentInfoComponent } from './teacher-student-info/teacher-student-info.component';
import { StudentTeacherInfoComponent } from './student-teacher-info/student-teacher-info.component';
import { StudentNotificationsComponent } from './student-notifications/student-notifications.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/admin', component: AdminLoginComponent },
  { path: 'student-lectures', component: StudentComponent },
  { path: 'student-teachers', component: StudentTeachersComponent },
  { path: 'student', component: StudentProfileComponent },
  { path: 'student-notifications', component: StudentNotificationsComponent },

  {
    path: 'student-teachers/:teacherId',
    component: StudentTeacherInfoComponent,
  },

  { path: 'teacher', component: TeacherComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/students', component: AdminStudentsComponent },
  { path: 'admin/teachers', component: AdminTeachersComponent },
  { path: 'admin/requests', component: AdminRequestsComponent },
  { path: 'admin/subjects', component: AdminSubjectsComponent },
  { path: 'newPassword', component: ForgottenPasswordComponent },
  { path: 'teacher-lectures', component: TeacherLecturesComponent },
  {
    path: 'teacher-students/:studentId',
    component: TeacherStudentInfoComponent,
  },
  { path: 'teacher-students', component: TeacherStudentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
