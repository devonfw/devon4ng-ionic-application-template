import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { ComponentsModule } from 'src/app/components/components.module';
import { LoginPageComponent } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
];
@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslocoModule,
    RouterModule.forChild(routes),
  ],
})
export class LoginPageModule {}
