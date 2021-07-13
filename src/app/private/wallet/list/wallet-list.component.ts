import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { WalletService } from 'app/common/service/wallet.service';
import { Wallet } from 'app/common/model/wallet';
import { UtilService } from 'app/common/util/util.service';

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

  constructor(private walletService: WalletService,
              private formBuilder: FormBuilder,
              private utilService: UtilService) { }

  ngOnInit() {
    this.initForm();
    this.getWallet();
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

}
