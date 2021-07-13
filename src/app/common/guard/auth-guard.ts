import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilService } from '../util/util.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private utilService: UtilService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean> | Promise<boolean> | boolean {
    if(!this.utilService.isLoggedIn()){
      this.utilService
      .messageError('Você precisa estar logado para acessar essa funcionalidade!');
      this.utilService.goTo('/auth/login');
      return false;
    }
    return true;
  }
}
