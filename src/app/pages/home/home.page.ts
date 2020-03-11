import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from '../../services/security/auth.service';
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
  constructor(public auth: AuthService, public translate: TranslocoService) {}
}
