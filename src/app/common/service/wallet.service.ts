import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { Response } from '../response/response';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class WalletService {

  url: string = `${environment.api}/wallet`;

  constructor(private http: Http) { }

  public save(wallet: any): Observable<Response> {
    return this.http.post(this.url, wallet)
    .map(response => response.json());
  }

  public getByName(name: string = null, page: number = 0): Observable<Response> {
    return this.http.get(`${this.url}?name=${name}&page=${page}`)
    .map(response => response.json());
  }
}
