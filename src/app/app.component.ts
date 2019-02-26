import { Component, ViewChild } from '@angular/core';

import { Platform } from '@ionic/angular';
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
  rootPage: any;
  pages: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthServiceProvider,
    private translate: TranslateService,
    private router: Router,
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
    this.translate.setDefaultLang('en');
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
