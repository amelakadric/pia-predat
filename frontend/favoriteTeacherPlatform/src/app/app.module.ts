import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { AdminTeachersComponent } from './admin-teachers/admin-teachers.component';
import { AdminRequestsComponent } from './admin-requests/admin-requests.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminSubjectsComponent } from './admin-subjects/admin-subjects.component';
import { TeacherNavbarComponent } from './teacher-navbar/teacher-navbar.component';
import { TeacherLecturesComponent } from './teacher-lectures/teacher-lectures.component';
import { TeacherStudentsComponent } from './teacher-students/teacher-students.component';
import { RateTeacherModalComponent } from './rate-teacher-modal/rate-teacher-modal.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UserIdInterceptor } from './services/interceptor/user-id-interceptor.service';
import { HighchartsChartModule } from 'highcharts-angular';
import { StudentNavbarComponent } from './student-navbar/student-navbar.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentTeachersComponent } from './student-teachers/student-teachers.component';
import { TeacherCancelLectureModalComponent } from './teacher-cancel-lecture-modal/teacher-cancel-lecture-modal.component';
import { TeacherRejectLectureModalComponent } from './teacher-reject-lecture-modal/teacher-reject-lecture-modal.component';
import { TeacherStudentInfoComponent } from './teacher-student-info/teacher-student-info.component';
import { RateStudentModalComponent } from './rate-student-modal/rate-student-modal.component';
import { StudentTeacherInfoComponent } from './student-teacher-info/student-teacher-info.component';
import { StudentNotificationsComponent } from './student-notifications/student-notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    StudentComponent,
    TeacherComponent,
    AdminComponent,
    AdminStudentsComponent,
    AdminTeachersComponent,
    AdminRequestsComponent,
    AdminNavbarComponent,
    AdminLoginComponent,
    ForgottenPasswordComponent,
    AdminSubjectsComponent,
    TeacherNavbarComponent,
    TeacherLecturesComponent,
    RateStudentModalComponent,
    TeacherStudentsComponent,
    RateTeacherModalComponent,
    TeacherCancelLectureModalComponent,
    TeacherRejectLectureModalComponent,
    StudentNavbarComponent,
    StudentProfileComponent,
    StudentTeachersComponent,
    TeacherStudentInfoComponent,
    StudentTeacherInfoComponent,
    StudentNotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbRatingModule,
    PdfViewerModule,
    HighchartsChartModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserIdInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
