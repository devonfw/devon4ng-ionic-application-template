
import { Injectable } from '@angular/core';
/*
  Generated class for the BussinessOperatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BussinessOperatorProvider {

  public serverPath = 'http://localhost:8081/oasp4j-sample-server/';
  public restPath = 'http://localhost:8081/oasp4j-sample-server/services/rest/';
  public serverPathM = 'http://localhost:8081/mythaistar/';
  public restPathM = 'http://localhost:8081/mythaistar/services/rest/';

  constructor() { }

  login() {
      return this.serverPath + 'login';
  }
  logout() {
      return this.restPath + 'logout';
  }
  getCsrf() {
      return this.restPath + 'security/v1/csrftoken';
  }
}