import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceProvider } from '../security/auth-service';
import { BusinessOperatorProvider } from '../shared/business-operator';
/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({ providedIn: 'root'})
export class LoginProvider {
  constructor(
    public http: HttpClient,
    public authservice: AuthServiceProvider,
    private BO: BusinessOperatorProvider,
  ) {}

  IonicAngularLogin(login, password): Observable<any> {
    return this.http.post(
      this.BO.login(), //url
      { j_username: login, j_password: password }, //body
      { responseType: 'text', observe: 'response' },
    );
  }

  login(loginparams: any): Observable<any> {
    return this.IonicAngularLogin(loginparams.username, loginparams.password);
  }
}
