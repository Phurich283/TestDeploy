import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import TokenService from '../authentication-services/token.service';

@Injectable({
  providedIn: 'root',
})
export default class RouteService {
  constructor(
    private readonly router: Router,
    private readonly tokenService: TokenService
  ) {}

  toLanding(): Promise<boolean> {
    return this.router.navigate(['/app']);
  }

  toFirstLogin(): Promise<boolean> {
    return this.router.navigate(['/auth/first-login']);
  }

  toForgetPassword(): Promise<boolean> {
    return this.router.navigate(['/auth/forgot-password']);
  }

  toLogin(): Promise<boolean> {
    return this.router.navigate(['/auth/login']);
  }

  revokeCredentialAndGotoLogin(): Promise<boolean> {
    this.tokenService.revokeAccess();
    return this.toLogin();
  }

  toCheckEmail(): Promise<boolean> {
    return this.router.navigate(['/auth/forgot-password/check-mail']);
  }
}
