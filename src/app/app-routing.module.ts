import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'login', loadChildren: () => import('./components/auth-tabs/auth-tabs.module').then(m => m.AuthTabsModule) },
  { path: '', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
