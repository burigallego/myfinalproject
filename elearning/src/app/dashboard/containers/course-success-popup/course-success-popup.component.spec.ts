import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSuccessPopupComponent } from './course-success-popup.component';

describe('CourseSuccessPopupComponent', () => {
  let component: CourseSuccessPopupComponent;
  let fixture: ComponentFixture<CourseSuccessPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSuccessPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
