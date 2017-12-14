import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { HeaderComponent } from '../../components/header/header';

@NgModule({
  declarations: [
    HomePage,
    HeaderComponent
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    HeaderComponent
  ],
})
export class HomePageModule {}
