import { Injectable } from '@angular/core';
import { Login } from 'src/app/interfaces/authen';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  constructor(private http: HttpClient) {}

  authUserLogin(credential: Login): Observable<any> {
    return this.http.post<any>(
      `${environment.endpoint + 'auth/login'}`,
      JSON.stringify(credential),
      httpOptions
    );
  }

  requestForgetPassword(body: any) {
    return this.http.post<any>(
      `${environment.endpoint + 'auth/forget-password'}`,
      body
    );
  }

  verifyResetPasswordCredential(body: any) {
    return this.http.post(
      `${environment.endpoint + 'auth/forget-password/validate'}`,
      body
    );
  }

  resetPassword(body: any) {
    return this.http.post(
      `${environment.endpoint + 'auth/forget-password/change-password'}`,
      body
    );
  }

  validateEmail(body: any) {
    return this.http.post<any>(
      `${environment.endpoint + 'auth/validate/email'}`,
      body
    );
  }

  changeFirstLoginPassword(body: { password: string }) {
    return this.http.post<any>(
      `${environment.endpoint + 'user/first-login'}`,
      body
    );
  }
}
