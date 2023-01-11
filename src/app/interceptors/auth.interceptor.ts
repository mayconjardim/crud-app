import { AuthenticationService } from './../services/authentication.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private inj: Injector) {}

  intercept(
    httpRequest: HttpRequest<any>,
    httpHandler: HttpHandler
  ): Observable<HttpEvent<any>> {
    const auth = this.inj.get(AuthenticationService);
    if (httpRequest.url.includes(`${auth.host}/user/login`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${auth.host}/user/register`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${auth.host}/user/resetpassword`)) {
      return httpHandler.handle(httpRequest);
    }
    auth.loadToken;
    const token = auth.getToken();
    const request = httpRequest.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return httpHandler.handle(request);
  }
}
