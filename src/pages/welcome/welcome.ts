import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  name = "Welcome"

  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService) {
    
    // this should go in the header
    translate.setDefaultLang('en');
  }

  back(){
    this.navCtrl.popToRoot();
  }

}
