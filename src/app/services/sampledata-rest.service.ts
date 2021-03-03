import { BusinessOperatorService } from './shared/business-operator.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SampledataSearchCriteria } from './interfaces/sampledata-search-criteria';
import { Sampledata } from './interfaces/sampledata';

/**
 * Generated class for the SampledataRestService service. Implements the REST service.
 * See https://angular.io/guide/dependency-injection for more info on providers
 * and Angular DI.
 */
@Injectable({ providedIn: 'root' })
export class SampledataRestService {
  constructor(public http: HttpClient, public bo: BusinessOperatorService) {}

  /**
   * @param  sampledata The item in the list.
   * @returns The found sampledata from the server.
   */
  getSampledata(sampledata: Sampledata): Observable<any> {
    return this.http.post(
      this.bo.sampledataService() + 'search',
      sampledata,
      {},
    );
  }

  /**
   * @param  sampledata The sampledata to save to the database.
   * @returns The result of the save operation.
   */
  save(sampledata: Sampledata) {
    return this.http.post(this.bo.sampledataService(), sampledata, {});
  }

  /**
   * @param  sampledataSearchCriteria Object used for searching sampledatas by a criteria on the server.
   * @returns The first data page on the server.
   */
  retrieveData(
    sampledataSearchCriteria: SampledataSearchCriteria,
  ): Observable<any> {
    return this.http.post(
      this.bo.sampledataService() + 'search',
      sampledataSearchCriteria,
    );
  }

  /**
   * @param  sampledataSearchCriteria Object used for searching sampledatas by a criteria on the server.
   * @returns A list of the found sampledatas on the server.
   */
  search(sampledataSearchCriteria: SampledataSearchCriteria) {
    return this.http.post(
      this.bo.sampledataService() + 'search',
      sampledataSearchCriteria,
      {},
    );
  }

  /**
   * @param  id The id of the sampledata to delete.
   * @returns The result of the delete operation.
   */
  delete(id: number) {
    return this.http.delete(this.bo.sampledataService() + id, {});
  }
}
