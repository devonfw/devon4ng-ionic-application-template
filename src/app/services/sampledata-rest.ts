import { BusinessOperatorProvider } from '../services/shared/business-operator';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SampledataSearchCriteria } from './interfaces/sampledata-search-criteria';
import { Sampledata } from './interfaces/sampledata';

/**
  Generated class for the SampledataRest provider. Implements the REST service.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({ providedIn: 'root' })
export class SampledataRest {
  constructor(public http: HttpClient, public BO: BusinessOperatorProvider) {}

  /**
   * @param  sampledata The item in the list.
   * @returns The found sampledata from the server.
   */
  getSampledata(sampledata: Sampledata): Observable<any> {
    return this.http.post(
      this.BO.sampledataService() + 'search',
      sampledata,
      {}
    );
  }

  /**
   * @param  sampledata The sampledata to save to the database.
   * @returns The result of the save operation.
   */
  save(sampledata: Sampledata) {
    return this.http.post(this.BO.sampledataService(), sampledata, {});
  }

  /**
   * @param  sampledataSearchCriteria Object used for searching sampledatas by a criteria on the server.
   * @returns The first data page on the server.
   */
  retrieveData(
    sampledataSearchCriteria: SampledataSearchCriteria
  ): Observable<any> {
    return this.http.post(
      this.BO.sampledataService() + 'search',
      sampledataSearchCriteria
    );
  }

  /**
   * @param  sampledataSearchCriteria Object used for searching sampledatas by a criteria on the server.
   * @returns A list of the found sampledatas on the server.
   */
  search(sampledataSearchCriteria: SampledataSearchCriteria) {
    return this.http.post(
      this.BO.sampledataService() + 'search',
      sampledataSearchCriteria,
      {}
    );
  }

  /**
   * @param  id The id of the sampledata to delete.
   * @returns The result of the delete operation.
   */
  delete(id: number) {
    return this.http.delete(this.BO.sampledataService() + id, {});
  }
}
