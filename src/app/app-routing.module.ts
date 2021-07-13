import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './common/guard/auth-guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './public/public.module#PublicModule'
  },
  {
    path: 'app',
    loadChildren: './private/private.module#PrivateModule',
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: 'auth', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
