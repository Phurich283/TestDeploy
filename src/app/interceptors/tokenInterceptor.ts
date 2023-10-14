import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import TokenService from '../services/authentication-services/token.service';
import { HTTP_HEADER } from '../configs/global.config';

@Injectable()
export default class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly tokenService: TokenService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req;
    let accessToken: string | null = this.tokenService.accessToken;
    if (accessToken) {
      request = req.clone({
        headers: req.headers.set(
          HTTP_HEADER.AUTH,
          `Bearer ${accessToken || ''}`
        ),
      });
    }
    return next.handle(request);
  }
}
