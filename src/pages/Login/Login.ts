
import { HomePage } from '../home/home'
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/loginProvider'
import { AuthServiceProvider } from '../../providers/security/auth-service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from 'ionic-angular';
import {url} from '../../assets/serverPath';

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
        
        this.presentAlert(err);
        this.translate.get('login.errorMsg').subscribe((res: string) => {
        });
      });
  }

  presentAlert(error : any) {

        let alerttranslations: any = {};
        this.translate.get('alert.title').subscribe(t => {

          alerttranslations.title = t;
        });
        this.translate.get('alert.subtitle').subscribe(t => {
          alerttranslations.subtitle = t;
        });
        this.translate.get('alert.dismiss').subscribe(t => {
          alerttranslations.dismiss = t;
        });
        
        let alert = this.alertCtrl.create({
          title: alerttranslations.title,
          subTitle:alerttranslations.subtitle,
          buttons: [alerttranslations.dismiss]
        });
        alert.present();
      }



}
