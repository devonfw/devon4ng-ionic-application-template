
import { HomePage } from '../home/home'
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/loginProvider'
import { AuthServiceProvider } from '../../providers/security/auth-service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-Login',
  templateUrl: 'Login.html',
  providers: [TranslateService],
})
export class LoginPage {

  user: { username: string, password: string };
  alermessages: any = {};
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public auth: AuthServiceProvider, public translate: TranslateService, public loginp: LoginProvider) {
    this.user = { username: 'waiter', password: 'waiter' };
  }


  isAuthenticated() {
    return this.auth.getAuthenticated();
  }

  loginForm() {

    this.loginp.login({ username: this.user.username, password: this.user.password })
    .subscribe((res: any) => {

        this.auth.setToken(res.headers.get('Authorization'));
        this.auth.setAuthenticated(true);
        this.navCtrl.setRoot(HomePage);

      }, (err: any) => {
        this.auth.setAuthenticated(false);
        this.presentAlert();        
      });
  }

  presentAlert() {

        let alertTranslations: any = {};

        alertTranslations.title = this.translate.instant('alert.title');

        alertTranslations.subtitle = this.translate.instant('alert.subtitle');

        alertTranslations.dismiss = this.translate.instant('alert.dismiss');
        
        let alert = this.alertCtrl.create({
          title: alertTranslations.title,
          subTitle:alertTranslations.subtitle,
          buttons: [alertTranslations.dismiss]
        });
        alert.present();
      }



}
