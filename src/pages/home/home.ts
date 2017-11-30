import { Response } from '@angular/http';
import { WelcomePage } from '../welcome/welcome';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { LoginProvider } from '../../providers/login/loginProvider'
import { LoginComponent } from '../../components/login/login';
import { AuthServiceProvider } from '../../providers/security/auth-service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from 'ionic-angular';
import { HttpHeaderResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TranslateService],
})
export class HomePage {

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
    console.log(lang + " arrived");
    this.translate.use(lang);
  }

  logForm(){
    // console.log(username + "login component");
    this.loginp.login({username: this.user.username, password: this.user.password})
      .subscribe(() => {
        this.loginp.getCsrf().subscribe((data: any) => {
            this.auth.setToken(data.token);
            this.auth.setAuthenthicated(true);
            // this.router.navigate(['/home']);
        });
    }, (err: any) => {
        this.auth.setAuthenthicated(false);
        this.translate.get('login.errorMsg').subscribe((res: string) => {
        });
    });
}

    
 

    
  }
