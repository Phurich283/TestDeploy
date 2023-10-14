import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import AuthService from 'src/app/services/authentication-services/auth.service';
import TokenService from 'src/app/services/authentication-services/token.service';
import RouteService from 'src/app/services/global-services/routeService';

@Component({
  selector: 'app-first-login-page',
  templateUrl: './first-login-page.component.html',
  styleUrls: ['./first-login-page.component.scss'],
})
export class FirstLoginPageComponent {
  isSubmitted: boolean = false;
  oldPasswordError: any;

  constructor(
    private readonly tokenService: TokenService,
    private readonly authService: AuthService,
    private readonly routeService: RouteService
  ) {}

  onSubmit(password: string) {
    this.isSubmitted = true;
    this.authService
      .changeFirstLoginPassword({ password: password })
      .subscribe({
        next: ({ data }: any) => this.changePasswordSuccessfulHandler(data),
        error: (err: HttpErrorResponse) =>
          this.changePasswordFailedHandler(err),
        complete: () => (this.isSubmitted = false),
      });
  }

  changePasswordSuccessfulHandler(data: any) {
    this.tokenService.setToken(data.accessToken, data.refreshToken);
    this.tokenService.removeFirstLoginToken();
    this.routeService.toLanding().then();
  }

  changePasswordFailedHandler(err: HttpErrorResponse) {
    this.oldPasswordError = err.status;
    console.error(err);
  }
}
