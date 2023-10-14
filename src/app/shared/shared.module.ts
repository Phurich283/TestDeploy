import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthBgTemplateComponent } from './layouts/auth-bg-template/auth-bg-template.component';
import { ChangePasswordTemplateComponent } from './components/change-password-template/change-password-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthBgTemplateComponent, ChangePasswordTemplateComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [AuthBgTemplateComponent, ChangePasswordTemplateComponent],
})
export class SharedModule {}
