import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule', pathMatch: 'full' },
  { path: 'home', redirectTo: './pages/home/home', pathMatch: 'full' },
  { path: 'sampledata', redirectTo: './pages/sampledata-list/sampledata-list' , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
