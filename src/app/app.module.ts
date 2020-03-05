import { NgModule } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { AuthGuardService } from './services/authorization/auth-guard.service';
import { HttpinterceptorService } from './services/security/http-interceptor.service';
import { SampledataDetail } from './pages/sampledata-detail/sampledata-detail.page';
import { SampledataRestService } from './services/sampledata-rest.service';
import { SampledataList } from './pages/sampledata-list/sampledata-list.page';
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
  declarations: [AppComponent, SampledataList, SampledataDetail],
  entryComponents: [SampledataDetail],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ComponentsModule,
    TranslocoRootModule,
  ],

  providers: [
    AuthGuardService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpinterceptorService,
      multi: true,
    },
    SampledataRestService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
