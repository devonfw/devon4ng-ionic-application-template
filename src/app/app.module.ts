import { HttpinterceptorProvider } from '../providers/security/httpinterceptor';
import { AuthServiceProvider } from '../providers/security/auth-service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { LoginProvider } from '../providers/login/loginProvider';
import { BusinessOperatorProvider } from '../providers/shared/business-operator';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HeaderComponent } from '../components/header/header';
import { SampledataDetail } from '../pages/sampledata-detail/sampledata-detail';
import { SampledataRest } from '../providers/sampledata-rest';
import { SampledataList } from '../pages/sampledata-list/sampledata-list';


export function translateFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
    declarations: [MyApp, HomePage, LoginPage, HeaderComponent, SampledataList, SampledataDetail],
    imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(MyApp), TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: translateFactory,
            deps: [HttpClient]
        }
    })],
    bootstrap: [IonicApp],
    entryComponents: [MyApp, HomePage, LoginPage, SampledataList, SampledataDetail],
    providers: [TranslateModule, StatusBar, SplashScreen, {
        provide: ErrorHandler,
        useClass: IonicErrorHandler
    }, BusinessOperatorProvider, HttpClient, LoginProvider, AuthServiceProvider, {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpinterceptorProvider,
        multi: true
    }, SampledataRest]
}) export class AppModule {}