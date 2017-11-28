import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';
import { TranslateService } from '@ngx-translate/core'
import { HeaderComponent } from '../../components/header/header';

@NgModule({
  declarations: [
    WelcomePage,
    HeaderComponent
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),
    HeaderComponent
  ],
})
export class WelcomePageModule {}
