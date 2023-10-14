import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { loginGuard } from '../../guards/authentication/login.guard';
import { FirstLoginPageComponent } from './first-login-page/first-login-page.component';
import { firstLoginGuard } from '../../guards/authentication/firstlogin.guard';
import { CheckEmailPageComponent } from './check-email-page/check-email-page.component';
import { ChangePasswordPageComponent } from './change-password-page/change-password-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [loginGuard],
    component: LoginPageComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent,
  },
  {
    path: 'forgot-password/check-mail',
    component: CheckEmailPageComponent,
  },
  {
    path: 'forgot-password/change-password',
    component: ChangePasswordPageComponent,
  },
  {
    path: 'first-login',
    canActivate: [firstLoginGuard],
    component: FirstLoginPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
