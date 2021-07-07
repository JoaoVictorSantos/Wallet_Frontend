import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletFormComponent } from './form/wallet-form.component';
import { WalletListComponent } from './list/wallet-list.component';

const routes: Routes = [
  {path: '', component: WalletListComponent},
  {path: 'form', component: WalletFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WalletRoutingModule { }
