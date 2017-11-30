import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
/*
  Generated class for the BussinessOperatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BussinessOperatorProvider {

  public serverPath = 'http://localhost:8081/oasp4j-sample-server/';
  public restPath = 'http://localhost:8081/oasp4j-sample-server/services/rest/';

  constructor() { }

  login() {
      return this.serverPath + 'login';
  }
  logout() {
      return this.serverPath + 'logout';
  }
  getCsrf() {
      return this.restPath + 'security/v1/csrftoken';
  }
}