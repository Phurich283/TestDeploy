import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class TokenService {
  get accessToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  get refreshToken(): string | null {
    return sessionStorage.getItem('refreshToken');
  }

  set accessToken(accessToken: string) {
    sessionStorage.setItem('accessToken', accessToken);
  }

  set refreshToken(refreshToken: string) {
    sessionStorage.setItem('refreshToken', refreshToken);
  }

  set firstLogin(fistLogin: boolean) {
    sessionStorage.setItem('isFirst', String(fistLogin));
  }

  get firstLogin() {
    return sessionStorage.getItem('isFirst') === 'true';
  }

  setToken(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  isAuthenticationTokenNull() {
    let isRevoke = this.accessToken == null || this.refreshToken == null;
    if (isRevoke) sessionStorage.clear();
    return isRevoke;
  }

  revokeAccess() {
    sessionStorage.clear();
  }

  removeFirstLoginToken() {
    sessionStorage.removeItem('isFirst');
  }
}
