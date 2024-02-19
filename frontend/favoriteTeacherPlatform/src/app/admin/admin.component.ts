import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import * as Highcharts from 'highcharts';
import { Subject } from '../models/subject';
import { AuthService } from '../services/auth/auth.service';
import { Lecture } from '../models/lecture';
import { LectureService } from '../services/lecture/lecture.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private lectureService: LectureService
  ) {}

  ngOnInit(): void {
    let u = localStorage.getItem('user');
    if (u) this.user = JSON.parse(u);

    this.authService.getAllSubjects().subscribe((data) => {
      this.allSubjects = data;

      this.userService.getTeachers().subscribe((t) => {
        this.teachers = t;

        this.userService.getStudents().subscribe((s) => {
          this.students = s;
          this.allSubjects.forEach((e) => {
            this.subjects.push(e.subject);
          });
          this.subjectChart1 = this.subjects[0];
          this.renderTeacherChart();
          this.getGenderStatistics();
          this.genderData = this.teacherGenderData;
          this.chart2Title = 'Teacher Gender Distribution';

          this.renderPieChart();
          this.myPieChartData = this.getSchoolProfessorsData();
          this.renderMyPieChart();
          this.renderMyTeacherGenderChart();
        });
      });
      this.lectureService.getAllLectures().subscribe((lecs) => {
        this.allLectures = lecs;
        let d = new Date(this.allLectures[1].scheduledAt);
        this.getTopTeachersList();
        this.setLastChart(this.topTeachers[0].username);
      });
    });

    this.lectureService.getAllLectures().subscribe((lectures) => {
      const data = this.calculateAverageLecturesPerDay(lectures);
      this.chartOptions = {
        title: {
          text: 'Average number of lectures by days of the week',
        },
        xAxis: {
          categories: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        },
        yAxis: {
          title: {
            text: 'Average number of lectures',
          },
        },
        series: [
          {
            type: 'column',
            name: 'Average number of lectures',
            data: data,
          },
        ],
      };
    });
  }

  getTopTeachersList() {
    this.teachers.forEach((teacher) => {
      let lectures = this.allLectures.filter((l) => {
        l.professorId == teacher._id;
      });

      this.topTeachersNumbers.push({
        name: teacher,
        numOfLectures: lectures.length,
      });
    });
    this.topTeachersNumbers.sort((a, b) => b.numOfLectures - a.numOfLectures);
    this.topTeachersNumbers = this.topTeachersNumbers.slice(0, 10);

    this.topTeachersNumbers.forEach((t) => {
      this.topTeachers.push(t.name);
    });
    this.selectedTeacher = this.topTeachers[0].username;
  }

  getNumLecMonths(teacher: User) {
    for (let m = 1; m < 13; m++) {
      let lecs = this.allLectures.filter((l) => {
        let d = new Date(this.allLectures[1].scheduledAt);

        return l.professorId == teacher._id && d.getMonth() == m;
      });
      this.numberOfLecturesByMonthForSelectedTeacher.push(lecs.length);
    }
  }

  getSchoolProfessorsData() {
    let elementary = [1, 2, 3, 4, 5, 6, 7, 8];
    let elementaryTeachers = this.teachers.filter((t) => {
      return t.ageWishes.some((a) => elementary.includes(a));
    });

    let high = [1, 2, 3, 4, 5, 6, 7, 8];
    let highTeachers = this.teachers.filter((t) => {
      return t.ageWishes.some((a) => high.includes(a));
    });

    return [
      { name: 'High School teacher', y: highTeachers.length },
      { name: 'Elementary School teacher', y: elementary.length },
    ];
  }

  myPieChartData: any[] = [];

  topTeachersNumbers: any[] = [];
  topTeachers: User[] = [];
  selectedTeacher: string = '';
  numberOfLecturesByMonthForSelectedTeacher: number[] = [];

  allLectures: Lecture[] = [];

  chartOptions: any;
  Highcharts = Highcharts;

  user: User = new User();
  userRequests: User[] = [];
  teachers: User[] = [];
  students: User[] = [];
  allSubjects: Subject[] = [];
  subjects: string[] = [];
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  allAgesElemTeach: number[] = [];
  allAgesMiddleTeach: number[] = [];
  allAgesHighTeach: number[] = [];

  serijeTeacherChart = [];

  agesElemTeachNum: number = 0;
  agesMiddleTeachNum: number = 0;
  agesHighTeachNum: number = 0;

  subjectChart1: string = '';

  teacherGenderData: any = {};
  studentGenderData: any = {};
  genderData: any = {};
  subjectChart2 = 'teachers';
  chart2Title = 'Teacher Gender Distribution';

  numMale = 0;
  numFemale = 0;

  setLastChart(t: string) {
    this.numberOfLecturesByMonthForSelectedTeacher = [];
    this.selectedTeacher = t;
    this.userService.getUser(t).subscribe((u) => {
      this.getNumLecMonths(u);
      this.renderLastChart();
    });
  }

  renderLastChart() {
    const options: Highcharts.Options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Number of leactures for top 10 teacher by months',
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'June',
          'July',
          'Avg',
          'Sept',
          'Okt',
          'Nov',
          'Dec',
        ],
      },
      yAxis: {
        title: {
          text: 'Number of lectures',
        },
      },
      series: [
        {
          type: 'column', // Specify the type here
          name: 'Number of lectures',
          data: this.numberOfLecturesByMonthForSelectedTeacher, // Primer podataka za uzrast 18-30 godina
        },
      ],
    };

    Highcharts.chart('months-chart', options);
  }

  setSubjectChart2() {
    if (this.subjectChart2 == 'students') {
      this.chart2Title = 'Student Gender Distribution';
      this.genderData = this.studentGenderData;
    } else {
      this.chart2Title = 'Teacher Gender Distribution';

      this.genderData = this.teacherGenderData;
    }
    this.renderPieChart();
  }

  calculateAverageLecturesPerDay(lectures: Lecture[]): number[] {
    const daysCount = [0, 0, 0, 0, 0, 0, 0];
    const lecturesCount = [0, 0, 0, 0, 0, 0, 0];

    lectures.forEach((lecture) => {
      const dayOfWeek = new Date(lecture.scheduledAt).getDay();
      daysCount[dayOfWeek]++;
      lecturesCount[dayOfWeek] += lecture.duration;
    });

    let averages = [];
    for (let i = 0; i < 7; i++) {
      averages.push(lecturesCount[i] / daysCount[i]);
    }
    averages = daysCount;

    return averages;
  }

  getGenderStatistics() {
    let maleTeachers: number = 0;
    let femaleTeachers: number = 0;
    let maleStudents: number = 0;
    let femaleStudents: number = 0;
    this.teachers.forEach((t) => {
      if (t.gender == 'male') maleTeachers++;
      else if (t.gender == 'female') femaleTeachers++;
    });

    this.students.forEach((s) => {
      if (s.gender == 'male') maleStudents++;
      else if (s.gender == 'female') femaleStudents++;
    });

    this.teacherGenderData = [
      { name: 'Male', y: (maleTeachers / this.teachers.length) * 100 },
      { name: 'Female', y: (femaleTeachers / this.teachers.length) * 100 },
    ];
    this.studentGenderData = [
      { name: 'Male', y: (maleStudents / this.students.length) * 100 },
      { name: 'Female', y: (femaleTeachers / this.students.length) * 100 },
    ];
  }
  getGenderStatisticsForSubject(subject: string) {
    let maleTeachs = this.teachers.filter((t) => {
      return t.subjects.includes(subject) && t.gender == 'male';
    });

    let femaleTeachs = this.teachers.filter((t) => {
      return t.subjects.includes(subject) && t.gender == 'female';
    });

    this.numMale = maleTeachs.length;
    this.numFemale = femaleTeachs.length;
  }

  getStatisticsForSubject(subject: string) {
    let teachs = this.teachers.filter((t) => {
      return t.subjects.includes(subject);
    });
    let agesElemTeach = teachs.filter((t) => {
      return (
        t.ageWishes.includes(1) ||
        t.ageWishes.includes(2) ||
        t.ageWishes.includes(3) ||
        t.ageWishes.includes(4)
      );
    });

    let agesMiddleTeach = teachs.filter((t) => {
      return (
        t.ageWishes.includes(5) ||
        t.ageWishes.includes(6) ||
        t.ageWishes.includes(7) ||
        t.ageWishes.includes(8)
      );
    });

    let agesHighTeach = teachs.filter((t) => {
      return (
        t.ageWishes.includes(9) ||
        t.ageWishes.includes(10) ||
        t.ageWishes.includes(11) ||
        t.ageWishes.includes(12)
      );
    });

    this.agesElemTeachNum = agesElemTeach.length;
    this.agesMiddleTeachNum = agesMiddleTeach.length;
    this.agesHighTeachNum = agesHighTeach.length;
  }

  setSubjectChart1() {
    this.renderTeacherChart();
  }

  renderTeacherChart() {
    this.getStatisticsForSubject(this.subjectChart1);
    const options: Highcharts.Options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Number of teachers by subjects and grades',
      },
      xAxis: {
        categories: [this.subjectChart1], // Primer kategorija (predmeti)
      },
      yAxis: {
        title: {
          text: 'Number of teachers',
        },
      },
      series: [
        {
          type: 'column', // Specify the type here
          name: 'elementary school',
          data: [this.agesElemTeachNum], // Primer podataka za uzrast 18-30 godina
        },
        {
          type: 'column', // Specify the type here
          name: 'middle school',
          data: [this.agesMiddleTeachNum], // Primer podataka za uzrast 31-45 godina
        },
        {
          type: 'column', // Specify the type here
          name: 'high school',
          data: [this.agesHighTeachNum], // Primer podataka za uzrast 46+ godina
        },
      ],
    };

    Highcharts.chart('teacher-chart', options);
  }

  renderPieChart() {
    Highcharts.chart('gender-chart-container', {
      chart: {
        type: 'pie',
      },
      title: {
        text: this.chart2Title,
      },
      series: [
        {
          type: 'pie',
          name: 'Gender Distribution',
          data: this.genderData,
        },
      ],
    });
  }

  renderMyPieChart() {
    Highcharts.chart('schoolType-chart-container', {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Teacher School type distribution',
      },
      series: [
        {
          type: 'pie',
          name: 'School type teacher Distribution',
          data: this.myPieChartData,
        },
      ],
    });
  }

  subjectChartLast: string = 'Mathematics';

  subjectChartLastFunc() {
    this.renderLastChart();
  }

  renderMyTeacherGenderChart() {
    this.getGenderStatisticsForSubject(this.subjectChartLast);
    const options: Highcharts.Options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Number of teachers by subjects and gender',
      },
      xAxis: {
        categories: [this.subjectChartLast], // Primer kategorija (predmeti)
      },
      yAxis: {
        title: {
          text: 'Number of teachers',
        },
      },
      series: [
        {
          type: 'column', // Specify the type here
          name: 'male',
          data: [this.numMale], // Primer podataka za uzrast 18-30 godina
        },
        {
          type: 'column', // Specify the type here
          name: 'female',
          data: [this.numFemale], // Primer podataka za uzrast 31-45 godina
        },
      ],
    };
    Highcharts.chart('teachers-gender-chart', options);
  }
}
