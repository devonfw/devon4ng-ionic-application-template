import { TranslateService } from '@ngx-translate/core';
import { AuthServiceProvider } from '../../providers/security/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-Home',
  templateUrl: 'Home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public auth: AuthServiceProvider, public navParams: NavParams, public translate: TranslateService) {

  }

}
