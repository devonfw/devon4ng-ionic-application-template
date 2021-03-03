import { Component, Input, ViewChild } from '@angular/core';
import {
  AlertController,
  IonList,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { TranslocoService } from '@ngneat/transloco';
import { Pageable } from '../../services/interfaces/pageable';
import { PaginatedListTo } from '../../services/interfaces/paginated-list-to';
import { Sampledata } from '../../services/interfaces/sampledata';
import { SampledataSearchCriteria } from '../../services/interfaces/sampledata-search-criteria';
import { SampledataRestService } from '../../services/sampledata-rest.service';
import { SampledataDetailComponent } from '../sampledata-detail/sampledata-detail.page';

@Component({
  selector: 'app-sampledata-list',
  templateUrl: 'sampledata-list.page.html',
  styleUrls: ['sampledata-list.page.scss'],
})
export class SampledataListComponent {
  @Input() deleteModifiedButtonsDisabled = true;
  @Input() infiniteScrollEnabled = true;
  @ViewChild('slidingList', { static: true }) slidingList: IonList;
  /** Contains the strings for the deletion prompt */
  deleteTranslations: any = {};
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
    email: null,
    pageable: this.pageable,
  };
  sampledataListItem: Sampledata = {
    name: null,
    surname: null,
    age: null,
    email: null,
  };
  deleteButtonNames = ['dismiss', 'confirm'];
  deleteButtons = [
    { text: '', handler: (data: any) => {} },
    { text: '', handler: (data: any) => {} },
  ];

  sampledatas: Sampledata[] = [];
  selectedItemIndex = -1;

  constructor(
    public navCtrl: NavController,
    public sampledataRest: SampledataRestService,
    public alertCtrl: AlertController,
    public translocoService: TranslocoService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
  ) {}

  /**
   * Get the selected item index.
   *
   * @returns The current selected item index.
   */
  public getSelectedItemIndex(): number {
    if (this.selectedItemIndex <= -1) {
      return;
    }
    return this.selectedItemIndex;
  }

  /**
   * Set the selected item index.
   *
   * @param  index The item index you want to set.
   */
  public setSelectedItemIndex(index: number) {
    this.selectedItemIndex = index;
    this.deleteModifiedButtonsDisabled = false;
  }

  /**
   * Executed after a pull-to-refresh event. It reloads the sampledata list.
   *
   * @param  refresher Pull-to-refresh event.
   */
  public doRefresh(refresher: { target: { complete: () => void } }) {
    setTimeout(() => {
      this.reloadSampledataList();
      refresher.target.complete();
    }, 300);
  }

  /**
   * Presents the create dialog to the user and creates a new sampledata if the data is correctly defined.
   */
  public async createSampledata() {
    const modal = await this.modalCtrl.create({
      component: SampledataDetailComponent,
      componentProps: {
        dialog: 'add',
        edit: null,
      },
    });
    await modal.present();
    modal.onDidDismiss().then(() => this.reloadSampledataList());
  }

  /**
   * Presents the search dialog to the user and sets to the list all the found sampledatas.
   */
  public async searchSampledatas() {
    this.deleteModifiedButtonsDisabled = true;
    this.selectedItemIndex = -1;
    const modal = await this.modalCtrl.create({
      component: SampledataDetailComponent,
      componentProps: {
        dialog: 'filter',
        edit: null,
      },
    });

    await modal.present();
    modal.onDidDismiss().then((data) => {
      if (data && data.data == null) {
        return;
      } else {
        this.infiniteScrollEnabled = true;
        this.sampledataSearchCriteria = data.data[0];
        this.reloadSampledataList();
      }
    });
  }

  /**
   * Presents the modify dialog and updates the selected sampledata.
   */
  public async updateSelectedSampledata() {
    await this.slidingList.closeSlidingItems();

    if (!this.selectedItemIndex && this.selectedItemIndex !== 0) {
      return;
    }
    const cleanItem = this.sampledataListItem;
    for (const i of Object.keys(cleanItem)) {
      cleanItem[i] = this.sampledatas[this.selectedItemIndex][i];
    }

    const modal = await this.modalCtrl.create({
      component: SampledataDetailComponent,
      componentProps: {
        dialog: 'modify',
        edit: this.sampledatas[this.selectedItemIndex],
      },
    });
    await modal.present();
    modal.onDidDismiss().then((data: any) => {
      if (data && data.data) {
        this.sampledatas.splice(this.selectedItemIndex, 1, data.data);
      }
    });
  }

  /**
   * Presents a promt to the user to warn him about the deletion.
   */
  public async deleteSelectedSampledata() {
    await this.slidingList.closeSlidingItems();

    this.deleteTranslations = this.getTranslation(
      'sampledatamanagement.sampledata.operations.delete',
    );
    for (const i of Object.keys(this.deleteButtons)) {
      this.deleteButtons[i].text = this.deleteTranslations[
        this.deleteButtonNames[i]
      ];
    }
    const prompt = await this.alertCtrl.create({
      header: this.deleteTranslations.title,
      message: this.deleteTranslations.message,
      buttons: [
        { text: this.deleteButtons[0].text, handler: (data) => {} },
        {
          text: this.deleteButtons[1].text,
          handler: (data) => {
            this.confirmDeletion();
          },
        },
      ],
    });
    await prompt.present();
  }

  /**
   * Executed after the user reaches the end of the last page. It tries to retrieve the next data page.
   *
   * @param  infiniteScroll Infinite scroll event.
   */
  public doInfinite(infiniteScroll: { target: { complete: () => void } }) {
    if (this.sampledataSearchCriteria.pageable.pageNumber < 0) {
      this.infiniteScrollEnabled = false;
    } else {
      this.sampledataSearchCriteria.pageable.pageNumber =
        this.sampledataSearchCriteria.pageable.pageNumber + 1;

      setTimeout(() => {
        this.sampledataRest
          .retrieveData(this.sampledataSearchCriteria)
          .subscribe(
            (data: PaginatedListTo<Sampledata>) => {
              if (
                data.content.length === 0 &&
                this.sampledataSearchCriteria.pageable.pageNumber > 0
              ) {
                this.sampledataSearchCriteria.pageable.pageNumber =
                  this.sampledataSearchCriteria.pageable.pageNumber - 1;
                this.infiniteScrollEnabled = false;
              } else {
                this.sampledatas = this.sampledatas.concat(data.content);
              }

              infiniteScroll.target.complete();
            },
            (err) => {
              console.log(err);
            },
          );
      }, 300);
    }
  }

  /**
   * Enables the update and delete buttons for the selected sampledata.
   *
   * @param  index The index of the selected sampledata that will be allowed to be updated or deleted.
   */
  public enableUpdateDeleteOperations(index: number) {
    if (this.selectedItemIndex !== index) {
      this.selectedItemIndex = index;
      this.deleteModifiedButtonsDisabled = false;
    } else {
      this.selectedItemIndex = -1;
      this.deleteModifiedButtonsDisabled = true;
    }
  }

  /**
   * Runs when the page is about to enter and become the active page.
   */
  private ionViewWillEnter() {
    this.ionViewWillEnterAsync();
  }

  private async ionViewWillEnterAsync() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.sampledataRest.retrieveData(this.sampledataSearchCriteria).subscribe(
      (data: PaginatedListTo<Sampledata>) => {
        this.sampledatas = this.sampledatas.concat(data.content);
        loading.dismiss();
      },
      (err: any) => {
        loading.dismiss();
        console.log(err);
      },
    );
  }

  /**
   * Reloads the sampledata list, retrieving the first page.
   */
  private reloadSampledataList() {
    this.pageable.pageNumber = 0;
    this.sampledataSearchCriteria.pageable = this.pageable;
    this.deleteModifiedButtonsDisabled = true;
    this.selectedItemIndex = -1;
    this.sampledataRest.retrieveData(this.sampledataSearchCriteria).subscribe(
      (data: PaginatedListTo<Sampledata>) => {
        this.sampledatas = [].concat(data.content);
        this.infiniteScrollEnabled = true;
      },
      (err) => {
        this.sampledatas = [];
        console.log(err);
      },
    );
  }

  /**
   * Translates a string to the current language.
   *
   * @param  text The string to be translated.
   * @returns The translated string.
   */
  private getTranslation(text: string): string {
    const value = this.translocoService.translate(text);
    return value;
  }

  /**
   * Removes the current selected item.
   */
  private confirmDeletion() {
    if (!this.selectedItemIndex && this.selectedItemIndex !== 0) {
      return;
    }
    const search = this.sampledatas[this.selectedItemIndex];

    this.sampledataRest.delete(search.id).subscribe(
      (deleteresponse) => {
        this.sampledatas.splice(this.selectedItemIndex, 1);
        this.selectedItemIndex = -1;
        this.deleteModifiedButtonsDisabled = true;
      },
      (err) => {
        console.log(err);
      },
    );
  }
}
