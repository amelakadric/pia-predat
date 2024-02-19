import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTeacherInfoComponent } from './student-teacher-info.component';

describe('StudentTeacherInfoComponent', () => {
  let component: StudentTeacherInfoComponent;
  let fixture: ComponentFixture<StudentTeacherInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentTeacherInfoComponent]
    });
    fixture = TestBed.createComponent(StudentTeacherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
