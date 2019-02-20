import { Component, ViewChild } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthServiceProvider } from './services/security/auth-service';
import { TranslateService } from '@ngx-translate/core';
import { LoginPage } from './pages/login/login';
import { HomePage } from './pages/home/home';
import { SampledataList } from './pages/sampledata-list/sampledata-list';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
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
  ) {
    this.initializeApp();

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.pages = [{
          title: 'Home',
          component: HomePage
      }, {
          title: 'sampledata',
          component: SampledataList
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
    openPage(p: { component: any; }) {
        this.nav.setRoot(p.component);
    }
}
