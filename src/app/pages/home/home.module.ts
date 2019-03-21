import { NgModule, Component } from '@angular/core';
import { HomePage } from './home.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];
@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomePageModule {}
