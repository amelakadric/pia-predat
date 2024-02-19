import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherNavbarComponent } from './teacher-navbar.component';

describe('TeacherNavbarComponent', () => {
  let component: TeacherNavbarComponent;
  let fixture: ComponentFixture<TeacherNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherNavbarComponent]
    });
    fixture = TestBed.createComponent(TeacherNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
