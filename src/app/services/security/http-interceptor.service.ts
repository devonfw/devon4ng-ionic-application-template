import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class HttpinterceptorService implements HttpInterceptor {
  constructor(private inj: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const auth = this.inj.get(AuthService);

    const tempToken = auth.getToken();

    if (tempToken != null) {
      const afterTokenreq: HttpRequest<any> = req.clone({
        setHeaders: { authorization: tempToken },
      });
      return next.handle(afterTokenreq);
    } else {
      return next.handle(req);
    }
  }
}
