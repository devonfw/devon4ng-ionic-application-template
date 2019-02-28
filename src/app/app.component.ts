import { Component, ViewChild } from '@angular/core';

import { Platform } from '@ionic/angular';
import { AuthServiceProvider } from './services/security/auth-service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { Plugins } from '@capacitor/core';
const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage: any;
  pages: any;

  constructor(
    private platform: Platform,
    private auth: AuthServiceProvider,
    private translate: TranslateService,
    private router: Router,
  ) {
    this.initializeApp();

    platform.ready().then(() => {
      //StatusBar.setStyle();
      SplashScreen.hide().catch(()=> {
        console.warn("Spashscreen not available");
      });
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
      //this.statusBar.styleDefault();
      SplashScreen.hide().catch(()=> {
        console.warn("Spashscreen not available");
      });
    });
  }

  isAuthenticated() {
      return this.auth.getAuthenticated();
  }

  openPage(p: { route: any; }) {
      this.router.navigate([p.route]);
  }
}
