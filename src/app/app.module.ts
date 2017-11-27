import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { LoginComponent } from '../components/login/login.component';
import { LoginProvider } from '../components/login/shared/loginProvider';
import { WelcomePage } from '../pages/welcome/welcome';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthServiceProvider } from './core/security/auth-service'
import { BussinessOperatorProvider } from './core/shared/bussiness-operator';
import { LoginComponent } from '../components/login/login';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    BussinessOperatorProvider,
    HttpClient,
    LoginProvider
  ]
})
export class AppModule {}
