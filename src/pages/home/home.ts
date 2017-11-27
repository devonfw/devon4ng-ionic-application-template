import { WelcomePage } from '../welcome/welcome';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HttpClientModule } from '@angular/common/http';
import { LoginProvider } from '../../components/login/shared/loginProvider';
import { LoginComponent } from '../../components/login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  user : {name: string , password: string };

  constructor( public navCtrl: NavController,  public loginp : LoginProvider) {
    this.user = {name : 'waiter' ,password : 'waiter'};
  }

  logForm(){
     this.loginp.login(this.user);
     this.navCtrl.push(WelcomePage);
  }
}
