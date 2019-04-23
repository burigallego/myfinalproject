import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResourcePopupComponent } from './edit-resource-popup.component';

describe('EditResourcePopupComponent', () => {
  let component: EditResourcePopupComponent;
  let fixture: ComponentFixture<EditResourcePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditResourcePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResourcePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
