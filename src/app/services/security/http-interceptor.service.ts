import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from './auth.service';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpinterceptorService implements HttpInterceptor {
  constructor(private inj: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let auth = this.inj.get(AuthService);

    let tempToken = auth.getToken();

    if (tempToken != null) {
      let afterTokenreq: HttpRequest<any>;

        // CSRF
        if (environment.security === 'csrf') {
          afterTokenreq = req.clone({
            withCredentials: true,
            setHeaders: { 'x-csrf-token': tempToken },
          });
        }

        // JWT
        if (environment.security === 'jwt') {
          afterTokenreq = req.clone({
            setHeaders: { authorization: tempToken },
          });
        }

      return next.handle(afterTokenreq);
    } else {
      return next.handle(req);
    }
  }
}
