import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { FirstLoginPageComponent } from './first-login-page/first-login-page.component';
import { CheckEmailPageComponent } from './check-email-page/check-email-page.component';
import { ChangePasswordPageComponent } from './change-password-page/change-password-page.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    ForgotPasswordPageComponent,
    FirstLoginPageComponent,
    CheckEmailPageComponent,
    ChangePasswordPageComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AuthenticationModule {}
