import { AUTHORIZATION } from './../util/constants.util';
import { CONTENT_TYPE, BEARER } from '../util/constants.util';
import { Injectable } from '@angular/core';
import { UtilService } from './../util/util.service';
import { Http, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpInterceptor extends Http {

  constructor(backend: ConnectionBackend,
             defaultOptions: RequestOptions,
             private utilService: UtilService) {
    super(backend, defaultOptions);
  }

  request(url: Request, options?: RequestOptionsArgs): Observable<Response> {
    if (options == null) {
      options = new RequestOptions();
    }

    if (!url.headers.get(CONTENT_TYPE)) {
      url.headers.set(CONTENT_TYPE, 'application/json');
    }

    if (this.utilService.isLoggedIn() != null) {
      url.headers.set(AUTHORIZATION, `${BEARER} ${this.utilService.getToken()}`);
    }

    return this.intercept(super.request(url, options), url);
  }

  intercept(observable: Observable<Response>, request: Request): Observable<Response> {
    return observable.catch((err, source) => {
      err = err.json();
      if (err.status === 401) {
          if(request.url && request.url.indexOf('auth') !== -1){
            this.utilService.messageError('Login ou senha inválido(s).');
          }else{
            this.utilService.messageError(err.message);
            this.utilService.goTo('/auth/login');
          }
        return Observable.throw(err.json());
      } else {
        if(err){
          if(err.errors){
            this.utilService.messageError(err.errors.join('\n'));
          }else if(err.message){
            this.utilService.messageError(err.message);
          }
        }else{
          this.utilService.messageError('Aconteceu algum erro....');
        }
        return Observable.throw(err);
      }
    });
  }
}
