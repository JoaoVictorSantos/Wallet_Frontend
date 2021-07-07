import { UtilService } from './../../../common/util/util.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Wallet } from 'app/common/model/wallet';
import { WalletService } from 'app/common/service/wallet.service';

@Component({
  selector: 'app-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.css']
})
export class WalletFormComponent implements OnInit {

  form: FormGroup;
  wallet: Wallet = new Wallet();

  constructor(private walletService: WalletService,
              private formBuilder: FormBuilder,
              private utilService: UtilService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      value: ['', [Validators.required]]
    });
  }

  public onSubmit(): void {
    if(this.form.invalid) {
      this.utilService.showErrorsForm(this.form);
      return;
    }

    this.save();
  }

  private save(): void {
    this.walletService.save(this.wallet)
    .subscribe(
      response => {
        if(response && response.data && response.data.id) {
          this.utilService.messageSuccess('Carteira cadastrada com sucesso!',
          () => this.utilService.goTo('/app/walle'));
        }
      }
    );
  }
}
