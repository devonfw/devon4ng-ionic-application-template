
import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { LoginProvider } from '../../services/login/loginProvider'
import { AuthServiceProvider } from '../../services/security/auth-service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'page-Login',
  templateUrl: 'Login.html',
  providers: [TranslateService],
})
export class LoginPage {

  user: { username: string, password: string };
  alermessages: any = {};
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public auth: AuthServiceProvider,
    public translate: TranslateService,
    public loginp: LoginProvider) {
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
        this.navCtrl.navigateRoot('../home/home');
      }, (err: any) => {
        this.auth.setAuthenticated(false);
        this.presentAlert();        
      });
  }

  async presentAlert() {

        let alertTranslations: any = {};

        alertTranslations.title = this.translate.instant('alert.title');

        alertTranslations.subtitle = this.translate.instant('alert.subtitle');

        alertTranslations.dismiss = this.translate.instant('alert.dismiss');

        const alert = await this.alertCtrl.create({
          header: alertTranslations.title,
          subHeader: alertTranslations.subtitle,
          buttons: [alertTranslations.dismiss]
        });

        await alert.present();
      }
}
