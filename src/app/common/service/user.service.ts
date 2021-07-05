import { environment } from './../../../environments/environment';
import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '../response/response';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private url: string = `${environment.api}/user`;

  constructor(private http: Http) { }

  public save(user: User): Observable<Response> {
    return this.http.post(`${this.url}`, user)
    .map(response => response.json());
  }

}
