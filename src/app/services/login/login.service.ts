import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { BusinessOperatorService } from '../shared/business-operator.service';

import { environment } from '../../../environments/environment';

/*
 * Generated class for the LoginService service.
 * See https://angular.io/guide/dependency-injection for more info on services
 * and Angular DI.
 */
@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    public http: HttpClient,
    public authService: AuthService,
    private bo: BusinessOperatorService,
  ) {}

  login(loginParams: any): Observable<any> {
    let options: any;
    // CSRF
    if (environment.security === 'csrf') {
      options = {
        withCredentials: true,
        responseType: 'text'
      };
    }
    // JWT
    if (environment.security === 'jwt') {
      options = { observe: 'response' };
    }
    return this.http.post(
      this.bo.login(), // url
      { j_username: loginParams.username, j_password: loginParams.password }, // body
      options,
    );
  }
  getCsrf(): Observable<any> {
    return this.http.get(this.bo.getCsrf(), { withCredentials: true });
  }
}
