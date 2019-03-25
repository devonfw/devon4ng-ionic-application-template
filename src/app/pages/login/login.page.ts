import { Component } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { AuthService } from '../../services/security/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'page-Login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  user: { username: string; password: string };
  alermessages: any = {};
  constructor(
    private router: Router,
    public alertCtrl: AlertController,
    public auth: AuthService,
    public translate: TranslateService,
    public loginp: LoginService,
  ) {
    this.user = { username: 'waiter', password: 'waiter' };
  }

  isAuthenticated() {
    return this.auth.getAuthenticated();
  }

  loginForm() {
    this.loginp
      .login({ username: this.user.username, password: this.user.password })
      .subscribe(
        (res: any) => {
          this.auth.setToken(res.headers.get('Authorization'));
          this.auth.setAuthenticated(true);
          this.router.navigate(['home']);
        },
        (err: any) => {
          this.auth.setAuthenticated(false);
          this.presentAlert();
        },
      );
  }

  async presentAlert() {
    const alertTranslations: any = {};

    alertTranslations.header = this.translate.instant('alert.title');

    alertTranslations.subHeader = this.translate.instant('alert.subtitle');

    alertTranslations.dismiss = this.translate.instant('alert.dismiss');

    const alert = await this.alertCtrl.create({
      header: alertTranslations.header,
      subHeader: alertTranslations.subHeader,
      buttons: [alertTranslations.dismiss],
    });

    await alert.present();
  }
}
