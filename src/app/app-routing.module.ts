import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampledataListComponent } from './pages/sampledata-list/sampledata-list.page';
import { AuthGuardService } from './services/authorization/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    pathMatch: 'full',
    canActivate: [AuthGuardService],
  },
  {
    path: 'sampledata',
    component: SampledataListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
