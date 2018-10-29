import { TranslateService } from '@ngx-translate/core';
import { Component, Input} from '@angular/core';
import { AlertController, ModalController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SampledataRest } from '../../providers/sampledata-rest';
import { SampledataDetail } from '../sampledata-detail/sampledata-detail'
import { Sampledata } from '../../providers/interfaces/sampledata'
import { Pagination } from '../../providers/interfaces/pagination'
import { SampledataSearchCriteria } from '../../providers/interfaces/sampledata-search-criteria';
import { PaginatedListTo } from '../../providers/interfaces/paginated-list-to';

    
@Component({
  selector: 'sampledata-list',
  templateUrl: 'sampledata-list.html',
})
export class SampledataList {
  /** Contains the strings for the deletion prompt */
  deleteTranslations: any = {};
  pagination: Pagination = { size:15, page:1, total:false };
  sampledataSearchCriteria : SampledataSearchCriteria = {  name:null, surname:null, age:null, mail:null, pagination : this.pagination };
  sampledataListItem : Sampledata = { name:null, surname:null, age:null, mail:null, };
  deleteButtonNames=["dismiss","confirm"];
  deleteButtons=[
                { text: "", handler: data => {  }},
                { text: "", handler: data => {  }}
                ]
  @Input() deleteModifiedButtonsDisabled: boolean = true;
  @Input() infiniteScrollEnabled = true;

  sampledatas: Sampledata[] = []
  selectedItemIndex: number = -1;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public sampledataRest: SampledataRest, public alertCtrl: AlertController, 
  public translate: TranslateService, public modalCtrl: ModalController, public loadingCtrl: LoadingController
  ) {}

  /**
   * Runs when the page is about to enter and become the active page.
   */
  private ionViewWillEnter() {
  
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.sampledataSearchCriteria.pagination.page = 1;
    this.sampledataRest.retrieveData(this.sampledataSearchCriteria).subscribe(
      (data: PaginatedListTo<Sampledata>) => {
        
        this.sampledatas = this.sampledatas.concat(data.result);
        loading.dismiss();
	}, 
	(err) => {
        loading.dismiss();
        console.log(err);
      }
    )
  }
  
  /**
   * Get the selected item index.
   * @returns The current selected item index.
   */
  public getSelectedItemIndex():number {
  
    if(this.selectedItemIndex <= -1){
      return;
    }
    return this.selectedItemIndex;
  }

  /**
   * Set the selected item index.
   * @param  index The item index you want to set.
   */
  public setSelectedItemIndex(index: number) {
    this.selectedItemIndex = index;
    this.deleteModifiedButtonsDisabled = false;
  }

  /**
   * Executed after a pull-to-refresh event. It reloads the sampledata list.
   * @param  refresher Pull-to-refresh event.
   */
  public doRefresh(refresher) {  
  
    setTimeout(() => {
      this.reloadSampledataList();
      refresher.complete();
    }, 500);
  }
  
  /**
   * Reloads the sampledata list, retrieving the first page.
   */
  private reloadSampledataList(){
    
    this.sampledatas = [];
    this.sampledataSearchCriteria.pagination.page = 1;
    this.deleteModifiedButtonsDisabled = true;
    this.selectedItemIndex = -1;
    this.sampledataRest.retrieveData(this.sampledataSearchCriteria).subscribe(
      (data: PaginatedListTo<Sampledata>) => {      
        this.sampledatas = this.sampledatas.concat(data.result);      
        this.infiniteScrollEnabled = true;
      }, 
      (err) => {
        console.log(err);
      }
    );
  }
  
  /**
   * Translates a string to the current language.
   * @param  text The string to be translated.
   * @returns The translated string.
   */
  private getTranslation(text: string): string {

    let value: string;
    value = this.translate.instant(text);
    return value;
  }
  
  /**
   * Presents the create dialog to the user and creates a new sampledata if the data is correctly defined.
   */
  public createSampledata() {

    let modal = this.modalCtrl.create(SampledataDetail, { dialog: "add", edit: null });
    modal.present();
    modal.onDidDismiss(() => this.reloadSampledataList());
  }

  /**
   * Presents the search dialog to the user and sets to the list all the found sampledatas.
   */
  public searchSampledatas() {
  
    this.deleteModifiedButtonsDisabled = true;
    this.selectedItemIndex = -1;
    let modal = this.modalCtrl.create(SampledataDetail, { dialog: "filter", edit: null });
    modal.present();
    modal.onDidDismiss(data => {
      if (data == null) return;
      else {
          this.infiniteScrollEnabled = true;
          this.sampledataSearchCriteria = data[0];
          this.sampledatas = data[1].result;          
      }
    });
  }

  /**
   * Presents the modify dialog and updates the selected sampledata.
   */
  public updateSelectedSampledata() { 
  
    if (!this.selectedItemIndex && this.selectedItemIndex != 0) {
      return;
    }
    let cleanItem = this.sampledataListItem;
    for (let i in cleanItem){
      cleanItem[i] = this.sampledatas[this.selectedItemIndex][i]; 
    }
    let modal = this.modalCtrl.create(SampledataDetail, { dialog: "modify", edit:this.sampledatas[this.selectedItemIndex]});
    modal.present();
    modal.onDidDismiss(data => {
      if(data == null) this.reloadSampledataList();
      else{
        for (let i in cleanItem){
          if (data[i] != cleanItem[i]) {
            data.modificationCounter++;
            break;
          }
        }
        this.sampledatas.splice(this.selectedItemIndex, 1, data);
      } 
    });
      
  }
  
  /**
   * Presents a promt to the user to warn him about the deletion.
   */
  public deleteSelectedSampledata() { 
    
    this.deleteTranslations = this.getTranslation('sampledatamanagement.sampledata.operations.delete');
    for (let i in this.deleteButtons){
      this.deleteButtons[i].text=this.deleteTranslations[this.deleteButtonNames[i]];
    }
    let prompt = this.alertCtrl.create({
      title: this.deleteTranslations.title, 
      message: this.deleteTranslations.message,
      buttons:  [
          { text: this.deleteButtons[0].text, handler: data => {  }}, 
          { text: this.deleteButtons[1].text, handler: data => { this.confirmDeletion(); } }
         ]
      });
      prompt.present();
    }

  /**
   * Removes the current selected item.
   */  
  private confirmDeletion() {

    if (!this.selectedItemIndex && this.selectedItemIndex != 0) {
      return;
    }    
    let search = this.sampledatas[this.selectedItemIndex]
    
    this.sampledataRest.delete(search.id).subscribe(
      (deleteresponse) => {      
        this.sampledatas.splice(this.selectedItemIndex, 1);
        this.selectedItemIndex = -1;
        this.deleteModifiedButtonsDisabled = true;
      }, 
      (err) => {
        console.log(err);
      }
    );
  } 

  /**
   * Executed after the user reaches the end of the last page. It tries to retrieve the next data page.
   * @param  infiniteScroll Infinite scroll event.
   */
  public doInfinite(infiniteScroll) {

    if (this.sampledataSearchCriteria.pagination.page <= 0) this.infiniteScrollEnabled = false;
    else {
      this.sampledataSearchCriteria.pagination.page = this.sampledataSearchCriteria.pagination.page + 1;

      setTimeout(() => {
        this.sampledataRest.retrieveData(this.sampledataSearchCriteria).subscribe(
          (data: PaginatedListTo<Sampledata>) => {
              if (data.result.length == 0 && this.sampledataSearchCriteria.pagination.page > 1){
                this.sampledataSearchCriteria.pagination.page = this.sampledataSearchCriteria.pagination.page - 1;
                this.infiniteScrollEnabled = false;
              }
              else{
                this.sampledatas = this.sampledatas.concat(data.result);
              }
              infiniteScroll.complete();
            }, 
            (err) => {
              console.log(err);
            }
        )    
      }, 500);
    }
  }

  /**
   * Enables the update and delete buttons for the selected sampledata.
   * @param  index The index of the selected sampledata that will be allowed to be updated or deleted.
   */
  public enableUpdateDeleteOperations(index: number) {
  
    if (this.selectedItemIndex != index){
      this.selectedItemIndex = index;
      this.deleteModifiedButtonsDisabled = false;
    }
    else{
      this.selectedItemIndex = -1;
      this.deleteModifiedButtonsDisabled = true;
    }
  }
  
}
