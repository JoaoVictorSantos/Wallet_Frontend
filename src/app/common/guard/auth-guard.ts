import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilService } from '../util/util.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private utilService: UtilService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean> | Promise<boolean> | boolean {
    return this.validator();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.validator();
  }

  private validator(): boolean {
    if(!this.utilService.isLoggedIn()){
      this.utilService
      .messageError('Você precisa estar logado para acessar essa funcionalidade!');
      this.utilService.goTo('/auth/login');
      return false;
    }
    return true;
  }
}
