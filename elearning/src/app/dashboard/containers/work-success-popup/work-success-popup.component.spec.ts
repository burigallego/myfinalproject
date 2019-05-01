import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSuccessPopupComponent } from './work-success-popup.component';

describe('WorkSuccessPopupComponent', () => {
  let component: WorkSuccessPopupComponent;
  let fixture: ComponentFixture<WorkSuccessPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkSuccessPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
