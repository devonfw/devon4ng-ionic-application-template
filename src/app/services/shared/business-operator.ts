import { Injectable } from '@angular/core';
import { SERVER_URL } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BusinessOperatorProvider {
  public serverPath = SERVER_URL;
  public restPath = SERVER_URL + 'services/rest/';
  constructor() {}

  /**
   * @returns The url to the login service.
   */
  login() {
    return this.restPath + 'login';
  }

  /**
   * @returns The url to the logout service.
   */
  logout() {
    return this.restPath + 'logout';
  }

  /**
   * @returns The url to the csrf token service.
   */
  getCsrf() {
    return this.restPath + 'security/v1/csrftoken';
  }

  /**
   * @returns The url to the sampledata management service.
   */
  sampledataService() {
    return this.restPath + 'sampledatamanagement/v1/sampledata/';
  }
}
