import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [HeaderComponent],
  imports: [IonicModule, CommonModule],
  exports: [HeaderComponent],
})
export class ComponentsModule {}
