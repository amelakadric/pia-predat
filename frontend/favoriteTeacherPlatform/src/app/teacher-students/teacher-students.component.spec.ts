import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentsComponent } from './teacher-students.component';

describe('TeacherStudentsComponent', () => {
  let component: TeacherStudentsComponent;
  let fixture: ComponentFixture<TeacherStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherStudentsComponent]
    });
    fixture = TestBed.createComponent(TeacherStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
