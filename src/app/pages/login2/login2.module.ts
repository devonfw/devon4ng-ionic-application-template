import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Login2Page } from './login2.page';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: Login2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Login2Page]
})
export class Login2PageModule {}
