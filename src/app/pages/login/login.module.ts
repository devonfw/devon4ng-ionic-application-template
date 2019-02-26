import { NgModule } from '@angular/core';
import { LoginPage } from './login.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];
@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    // IonicPageModule.forChild(LoginPage),
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  providers: [TranslateService],
})
export class LoginPageModule {}
