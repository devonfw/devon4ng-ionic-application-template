import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { HeaderComponent } from '../../components/header/header';

@NgModule({
  declarations: [
    HomePage,
    HeaderComponent
  ],
  imports: [
    HeaderComponent
  ],
})
export class HomePageModule {}
