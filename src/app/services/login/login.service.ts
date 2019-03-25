import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { BusinessOperatorService } from '../shared/business-operator.service';
/*
  Generated class for the LoginService service.

  See https://angular.io/guide/dependency-injection for more info on services
  and Angular DI.
*/
@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    public http: HttpClient,
    public authservice: AuthService,
    private BO: BusinessOperatorService,
  ) {}

  IonicAngularLogin(login, password): Observable<any> {
    return this.http.post(
      this.BO.login(), // url
      { j_username: login, j_password: password }, // body
      { responseType: 'text', observe: 'response' },
    );
  }

  login(loginparams: any): Observable<any> {
    return this.IonicAngularLogin(loginparams.username, loginparams.password);
  }
}
