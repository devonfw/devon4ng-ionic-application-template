import { LoginPage } from '../pages/login/login';

import { AuthServiceProvider } from '../providers/security/auth-service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  pages:any;
  
  user = {name: 'a', password: 'a'};

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthServiceProvider ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      this.pages = [
        { title: 'Home', component:  HomePage},
      ];
    });
  }

  isAuthenticated(){
    return this.auth.getAuthenticated();
  }
  openPage(p){
    this.nav.setRoot(p.component);
  }
}

