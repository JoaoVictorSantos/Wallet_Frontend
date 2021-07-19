import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Response } from '../response/response';
import { UserWallet } from '../model/user-wallet';

@Injectable()
export class UserWalletService {

  url: string = `${environment.api}/user-wallet`;

  constructor(private http: Http) { }

  save(userWallet: UserWallet): Observable<Response> {
    return this.http.post(this.url, userWallet)
    .map(response => response.json());
  }
}
