
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

  user : {username: string , password: string };
  alermessages: any = {};
  constructor( public navCtrl: NavController, public alertCtrl: AlertController, public auth: AuthServiceProvider , public translate: TranslateService, public loginp : LoginProvider ) {
    this.user = {username : 'waiter' ,password : 'waiter'};
    translate.setDefaultLang('en');
  }

  
  isauthenthicated(){
    return this.auth.getAuthenthicated();
  }

  presentAlert() {

    let a: any = {};
    
        this.translate.get('ALERT.TITLE').subscribe(t => {
          a.title = t;
        });
    
        this.translate.get('ALERT.SUBTITLE').subscribe(t => {
          a.subTitle = t;
        });
        this.translate.get('ALERT.DISMISS').subscribe(t => {
          a.dismiss = t;
        });

    let alert = this.alertCtrl.create({
      title: a.title,
      subTitle: a.subTitle,
      buttons: [a.dismiss]
    });
    alert.present();
  }
  
  togglelanguage(lang: string){
    // console.log(lang + " arrived");
    this.translate.use(lang);
  }

  logForm(){
    // console.log(username + "login component");
    this.auth.setAuthenthicated(true);
    this.navCtrl.setRoot(HomePage);
    /*
    this.loginp.login({username: this.user.username, password: this.user.password})
      .subscribe((res: any) => {
        
            this.auth.setToken(res.headers.get('Authorization'));
            this.auth.setAuthenthicated(true);
            this.navCtrl.setRoot(HomePage);
            // console.log(this.auth.getToken());
            // this.router.navigate(['/home']);

    }, (err: any) => {
        this.auth.setAuthenthicated(false);
        this.translate.get('login.errorMsg').subscribe((res: string) => {
        });
    }); */
}

    
 

    
  }
