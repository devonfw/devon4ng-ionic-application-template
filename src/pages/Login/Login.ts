
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


  isauthenthicated() {
    return this.auth.getAuthenthicated();
  }

  loginForm() {

    this.loginp.login({ username: this.user.username, password: this.user.password })
      .subscribe((res: any) => {

        this.auth.setToken(res.headers.get('Authorization'));
        this.auth.setAuthenthicated(true);
        this.navCtrl.setRoot(HomePage);

      }, (err: any) => {
        this.auth.setAuthenthicated(false);

        this.presentAlert();
        this.translate.get('login.errorMsg').subscribe((res: string) => {
        });
      });
  }

  presentAlert() {

        let alerttranslations: any = {};
    
        this.translate.get('ALERT.TITLE').subscribe(t => {

          alerttranslations.title = t;
        });
        this.translate.get('ALERT.SUBTITLE').subscribe(t => {
          alerttranslations.subTitle = t;
        });
        this.translate.get('ALERT.DISMISS').subscribe(t => {
          alerttranslations.dismiss = t;
        });
    
        let alert = this.alertCtrl.create({
          title: alerttranslations.title,
          subTitle: alerttranslations.subTitle,
          buttons: [alerttranslations.dismiss]
        });
        alert.present();
      }



}
