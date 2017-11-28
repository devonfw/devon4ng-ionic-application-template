import { WelcomePage } from '../welcome/welcome';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HttpClientModule } from '@angular/common/http';
import { LoginProvider } from '../../providers/login/loginProvider'
import { LoginComponent } from '../../components/login/login';
import { AuthServiceProvider } from '../../providers/security/auth-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [LoginComponent,TranslateService],
})
export class HomePage {

  user : {name: string , password: string };

  constructor( public navCtrl: NavController,  public loginc : LoginComponent, public auth: AuthServiceProvider , public translate: TranslateService ) {
    this.user = {name : 'waiter' ,password : 'waiter'};
  }

  isauthenthicated(){
    return this.auth.getAuthenthicated();
  }


  togglelanguage(lang: string){
   // this.translate.use(lang);
  }

  logForm(){
     
     this.loginc.login( this.user.name ,this.user.password);
     //if( this.auth.getAuthenthicated() ){
      this.navCtrl.push(WelcomePage);
     //}  else {
      // console.log("failed auth");
     //}
     
     //this.navCtrl.push(WelcomePage);
  }
}
