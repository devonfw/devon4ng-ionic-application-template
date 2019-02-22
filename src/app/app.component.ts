import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthServiceProvider } from './services/security/auth-service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  //@ViewChild(Nav) nav: Nav;
  rootPage: any; // = LoginPage
  pages: any;
  user = {
      name: 'a',
      password: 'a'
  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthServiceProvider,
    private translate: TranslateService,
    private router: Router,
    private menu: MenuController,
  ) {
    this.initializeApp();

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.pages = [{
          title: 'Home',
          route: 'home'
      }, {
          title: 'sampledata',
          route: 'sampledata'
      }, ];
    });
    translate.setDefaultLang('en');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  isAuthenticated() {
      return this.auth.getAuthenticated();
  }

  openPage(p: { route: any; }) {
      this.router.navigate([p.route]);
  }
}
