import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordTemplateComponent } from './change-password-template.component';

describe('ChangePasswordTemplateComponent', () => {
  let component: ChangePasswordTemplateComponent;
  let fixture: ComponentFixture<ChangePasswordTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordTemplateComponent]
    });
    fixture = TestBed.createComponent(ChangePasswordTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
