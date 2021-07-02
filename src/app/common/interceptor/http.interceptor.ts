import { CONTENT_TYPE, BERAER } from '../util/constants.util';
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
    return this.intercept(super.request(url, this.getRequestOptionArgs(options)), url);
  }

  getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }

    if (!options.headers.get(CONTENT_TYPE)) {
      options.headers.append(CONTENT_TYPE, 'application/json');
    }

    if (this.utilService.isLoggedIn() != null) {
      options.headers.append(BERAER, ` ${this.utilService.getToken()}`);
    }

    return options;
  }

  intercept(observable: Observable<Response>, request: Request): Observable<Response> {
    return observable.catch((err, source) => {
      if (err.status == 401) {
          if(request.url && request.url.indexOf("auth") != -1){
            this.utilService.messageError("Login ou senha inválido(s).");
          }else{
            this.utilService.messageError(err.message, () => this.utilService.goTo('/auth'));
          }
        return Observable.throw(err.json());
      } else {
        return Observable.throw(err);
      }
    });
  }
}