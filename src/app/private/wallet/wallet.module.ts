import { UtilService } from './../../common/util/util.service';
import { WalletService } from './../../common/service/wallet.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletListComponent } from './list/wallet-list.component';
import { WalletFormComponent } from './form/wallet-form.component';
import { UserWalletService } from 'app/common/service/user-wallet.service';
import { UserService } from 'app/common/service/user.service';

@NgModule({
  imports: [
    CommonModule,
    WalletRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    WalletListComponent,
    WalletFormComponent
  ],
  providers: [
    WalletService,
    UtilService,
    UserWalletService,
    UserService
  ]
})
export class WalletModule { }
