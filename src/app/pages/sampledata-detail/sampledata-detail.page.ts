import { NavParams, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { SampledataRest } from '../../services/sampledata-rest';
import { Sampledata } from '../../services/interfaces/sampledata';
import { SampledataSearchCriteria } from '../../services/interfaces/sampledata-search-criteria';
import { Pageable } from '../../services/interfaces/pageable';
import { PaginatedListTo } from '../../services/interfaces/paginated-list-to';
/**
 * Generated class for the SampledataDetail component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sampledata-detail',
  templateUrl: 'sampledata-detail.page.html',
  styleUrls: ['sampledata-detail.page.scss']
})
export class SampledataDetail {
  pageable: Pageable = {
    pageSize: 15,
    pageNumber: 0,
    sort: [
      {
        property: 'name',
        direction: 'ASC',
      },
    ],
  };
  sampledataSearchCriteria: SampledataSearchCriteria = {
    name: null,
    surname: null,
    age: null,
    mail: null,
    pageable: this.pageable,
  };

  sampledataReceived: Sampledata;
  cleanSampledata: Sampledata = {
    name: null,
    surname: null,
    age: null,
    mail: null,
    id: null,
    modificationCounter: null,
    revision: null,
  };

  translations = { title: 'Dialog', message: 'message' };
  dialogType = '';

  /** If filterActive is true, then the dialog will be of type search. */
  filterActive = true;

  constructor(
    public params: NavParams,
    public viewCtrl: ModalController,
    public translate: TranslateService,
    public sampledataRest: SampledataRest,
  ) {
    this.getTranslation(
      'sampledatamanagement.sampledata.operations.' + this.params.get('dialog'),
    );
    this.dialogType = this.params.get('dialog');
    this.sampledataReceived = this.params.get('edit');
    if (!this.sampledataReceived) {
      this.sampledataReceived = {
        name: null,
        surname: null,
        age: null,
        mail: null,
      };
    }
    if (this.dialogType === 'filter') {
      this.filterActive = false;
    }
  }

  /**
   * Translates the passed dialog to the current language
   * @param  dialog - The passed dialog
   */
  private getTranslation(dialog: string) {
    this.translations = this.translate.instant(dialog);
  }

  /**
   * Dismisses the current opened dialog and returns the result data to it's creator.
   * @param  data - Tuple containing all the objects which the server returns .
   */
  private dismiss(
    data: [SampledataSearchCriteria, PaginatedListTo<Sampledata>],
  ) {
    this.viewCtrl.dismiss(data);
    this.filterActive = true;
  }

  /**
   * Creates the add and modify dialog and returns the result data to it's creator.
   */
  public addOrModify() {
    this.cleanSampledata.id = null;
    for (const i of Object.keys(this.cleanSampledata)) {
      this.cleanSampledata[i] = this.sampledataReceived[i];
    }

    this.sampledataRest
      .save(this.sampledataReceived)
      .subscribe((data: Sampledata) => {
        this.viewCtrl.dismiss(data);
      });
  }

  /**
   * Creates the search dialog.
   */
  public search() {
    for (const i in this.sampledataReceived) {
      if (this.sampledataReceived[i] === '') {
        delete this.sampledataReceived[i];
      } else {
        this.sampledataSearchCriteria[i] = this.sampledataReceived[i];
      }
    }

    if (!this.sampledataSearchCriteria) {
      return;
    }
    this.sampledataRest
      .search(this.sampledataSearchCriteria)
      .subscribe((data: PaginatedListTo<Sampledata>) => {
        let dataArray: [SampledataSearchCriteria, PaginatedListTo<Sampledata>];
        dataArray = [this.sampledataSearchCriteria, data];
        this.dismiss(dataArray);
        this.sampledataSearchCriteria = {
          name: null,
          surname: null,
          age: null,
          mail: null,
          pageable: this.pageable,
        };
      });
  }

  /**
   * Clears all the search filters and returns the first data page.
   */
  clearSearch() {
    this.sampledataSearchCriteria.pageable.pageNumber = 0;
    this.sampledataRest
      .retrieveData(this.sampledataSearchCriteria)
      .subscribe((data: PaginatedListTo<Sampledata>) => {
        let dataArray: [SampledataSearchCriteria, PaginatedListTo<Sampledata>];
        dataArray = [this.sampledataSearchCriteria, data];
        this.dismiss(dataArray);
      });
  }
}
