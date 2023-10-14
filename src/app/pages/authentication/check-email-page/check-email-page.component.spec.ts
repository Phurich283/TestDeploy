import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckEmailPageComponent } from './check-email-page.component';

describe('CheckEmailPageComponent', () => {
  let component: CheckEmailPageComponent;
  let fixture: ComponentFixture<CheckEmailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckEmailPageComponent]
    });
    fixture = TestBed.createComponent(CheckEmailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
