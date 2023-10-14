import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { loginForm } from 'src/app/forms/auth-form';
import AuthService from 'src/app/services/authentication-services/auth.service';
import TokenService from 'src/app/services/authentication-services/token.service';
import DialogModalService from 'src/app/services/global-services/dialogModal.service';
import { HttpErrorResponse } from '@angular/common/http';
import RouteService from '../../../services/global-services/routeService';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loadingLogin: boolean = false;
  loginForm: FormGroup = loginForm();
  submitted: boolean = false;
  testError: any;
  showPassword: boolean = false;
  password: any;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private readonly routerService: RouteService,
    private readonly dialogService: DialogModalService
  ) {}

  ngOnInit(): void {
    this.password = 'password';
  }

  onShowPassword() {
    if (this.password === 'password') {
      this.password = 'text';
      this.showPassword = true;
    } else {
      this.password = 'password';
      this.showPassword = false;
    }
  }

  setServiceOnLogin() {
    this.loadingLogin = true;
    this.authService.authUserLogin(this.loginForm.value).subscribe({
      next: ({ data }) => this.successfulLoginHandler(data),
      error: (err) => this.failedLoginHandler(err),
      complete: () => console.log('finish Do Login Request'),
    });
  }

  private successfulLoginHandler(respDate: any) {
    this.loadingLogin = false;

    this.tokenService.setToken(respDate.accessToken, respDate.refreshToken);
    if (respDate.firstLogin) {
      this.tokenService.firstLogin = respDate.firstLogin;
      this.routerService.toFirstLogin().then();
    } else this.routerService.toLanding().then();
  }

  private failedLoginHandler(err: HttpErrorResponse) {
    console.error('Login Error : ', err);
    this.clearState();
    this.testError = err.status;
  }

  private clearState() {
    this.loadingLogin = false;
    this.submitted = false;
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.setServiceOnLogin();
    console.warn(this.loginForm.value);
  }
}
