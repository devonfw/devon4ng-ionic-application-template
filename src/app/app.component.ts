import { WelcomePage } from '../pages/welcome/welcome';
import { AuthServiceProvider } from '../providers/security/auth-service';
import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
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
        { title: 'Welcome', component: WelcomePage}
      ];
    });
  }

  isauthenthicated(){
    return this.auth.getAuthenthicated();
  }
  openPage(p){
    this.nav.setRoot(p.component);
  }
}

