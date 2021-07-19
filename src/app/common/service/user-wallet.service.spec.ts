/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserWalletService } from './user-wallet.service';

describe('UserWalletService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserWalletService]
    });
  });

  it('should ...', inject([UserWalletService], (service: UserWalletService) => {
    expect(service).toBeTruthy();
  }));
});
