import { TranslateService } from '@ngx-translate/core';
import { AuthServiceProvider } from '../../services/security/auth-service';
import { Component } from '@angular/core';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-Home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public auth: AuthServiceProvider,
    public translate: TranslateService) {

  }

}
