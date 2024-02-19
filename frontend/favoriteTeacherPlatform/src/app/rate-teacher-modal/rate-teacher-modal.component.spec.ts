import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTeacherModalComponent } from './rate-teacher-modal.component';

describe('RateTeacherModalComponent', () => {
  let component: RateTeacherModalComponent;
  let fixture: ComponentFixture<RateTeacherModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RateTeacherModalComponent]
    });
    fixture = TestBed.createComponent(RateTeacherModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
