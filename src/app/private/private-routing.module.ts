import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivateComponent } from './private.component';
import { AuthGuardChild } from 'app/common/guard/auth-guard-child';
import { AuthGuard } from 'app/common/guard/auth-guard';

const routes: Routes = [
  {
    path: '', component: PrivateComponent,
    children: [
      {
        path: 'wallet',
        loadChildren: './wallet/wallet.module#WalletModule'
      },
      { path: '**', redirectTo: 'wallet', pathMatch: 'full' }
    ],
    canActivateChild: [AuthGuardChild]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PrivateRoutingModule { }
