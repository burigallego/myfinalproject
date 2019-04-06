import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeMottoComponent } from './welcome-motto.component';

describe('WelcomeMottoComponent', () => {
  let component: WelcomeMottoComponent;
  let fixture: ComponentFixture<WelcomeMottoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeMottoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeMottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
