import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Response } from '../response/response';

@Injectable()
export class LoginService {

  url: string = `${environment.api}/auth`;
  
  constructor(private http: Http) { }

  public signIn(login: any): Observable<Response> {
    return this.http.post(this.url, login)
    .map(response => response.json());
  }
}
