import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/home/home.module#HomePageModule', pathMatch: 'full' },
  { path: 'home', redirectTo: './pages/home/home', pathMatch: 'full' },
  { path: 'sampledata', redirectTo: './pages/sampledata-list/sampledata-list' , pathMatch: 'full' },
  { path: 'login2', loadChildren: './pages/login2/login2.module#Login2PageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
