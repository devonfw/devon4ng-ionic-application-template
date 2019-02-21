import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampledataList } from './pages/sampledata-list/sampledata-list';

const routes: Routes = [
  { path: '', loadChildren: './pages/home/home.module#HomePageModule', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', pathMatch: 'full'},
  { path: 'sampledata', component: SampledataList, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
