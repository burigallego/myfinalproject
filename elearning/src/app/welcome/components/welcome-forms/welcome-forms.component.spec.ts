import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeFormsComponent } from './welcome-forms.component';

describe('WelcomeFormsComponent', () => {
  let component: WelcomeFormsComponent;
  let fixture: ComponentFixture<WelcomeFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
