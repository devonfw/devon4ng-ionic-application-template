import { Injectable } from '@angular/core';
import { SERVER_URL } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class BusinessOperatorProvider {
    public serverPath = SERVER_URL;
    public restPath = SERVER_URL + 'services/rest/';
    constructor() {}
    login() {
        return this.restPath + 'login';
    }
    logout() {
        return this.restPath + 'logout';
    }
    getCsrf() {
        return this.restPath + 'security/v1/csrftoken';
    }
    sampledataService() {
        return this.restPath + 'sampledatamanagement/v1/sampledata/';
    }
}
