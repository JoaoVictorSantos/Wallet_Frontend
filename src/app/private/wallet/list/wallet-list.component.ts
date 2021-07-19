import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { WalletService } from 'app/common/service/wallet.service';
import { Wallet } from 'app/common/model/wallet';
import { UtilService } from 'app/common/util/util.service';
import { UserWallet } from 'app/common/model/user-wallet';
import { UserWalletService } from 'app/common/service/user-wallet.service';
import { UserService } from './../../../common/service/user.service';
import { User } from 'app/common/model/user';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent implements OnInit {

  form: FormGroup;
  wallets: Wallet[] = [];
  name: string;
  showErrors: boolean;
  user: User;

  constructor(private walletService: WalletService,
              private formBuilder: FormBuilder,
              private utilService: UtilService,
              private userWalletService: UserWalletService,
              private userService: UserService) { }

  ngOnInit() {
    this.initForm();
    this.getWallet();
    this.getUserLoggedIn();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  private getWallet(): void {
    this.walletService.getByName(this.name)
    .subscribe(
      response => {
        if(response && response.data) {
          this.wallets = response.data.content;
        }
      }
    );
  }

  public onSearch(): void {
    if(this.form.invalid) {
      this.utilService.showErrorsForm(this.form);
      this.showErrors = true;
      return;
    }
    
    this.showErrors = false;
    this.getWallet();
  }

  public onClear(): void {
    this.form.controls['name'].setValue(null);
    this.name = null;
    this.showErrors = false;
    this.getWallet();
  }

  public onSaveUserWallet(idWallet: number): void {
    let userWallet = new UserWallet();
    userWallet.wallet = idWallet;
    userWallet.users = this.user.id;

    this.utilService.messageConfirmation(
      'Deseja realmente vincular a carteira?',
      (resp: any) => {
        if(resp) {
          this.saveUserWallet(userWallet);
        }
      }
    );
  }

  private saveUserWallet(userWallet: UserWallet): void {
    this.userWalletService.save(userWallet)
    .subscribe(
      response => {
        if(response && response.data && response.data.id){
          this.utilService
          .messageSuccess('Carteira vinculada com sucesso.');
        }
      }
    );
  }

  private getUserLoggedIn(): void {
    this.userService.loggedIn()
    .subscribe(
      response => {
        if(response && response.data){
          this.user = response.data;
        }
      }
    );
  }
}
