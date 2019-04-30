import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSuccessPopupComponent } from './register-success-popup.component';

describe('RegisterSuccessPopupComponent', () => {
  let component: RegisterSuccessPopupComponent;
  let fixture: ComponentFixture<RegisterSuccessPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSuccessPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
