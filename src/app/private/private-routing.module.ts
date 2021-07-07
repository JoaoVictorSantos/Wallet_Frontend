import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivateComponent } from './private.component';

const routes: Routes = [
  {
    path: '', component: PrivateComponent,
    children: [
      { path: 'wallet', loadChildren: './wallet/wallet.module#WalletModule' },
      { path: '**', redirectTo: 'wallet', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PrivateRoutingModule { }
