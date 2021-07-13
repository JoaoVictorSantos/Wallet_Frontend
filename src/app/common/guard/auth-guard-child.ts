import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilService } from '../util/util.service';

@Injectable()
export class AuthGuardChild implements CanActivateChild {

  constructor(private utilService: UtilService) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
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
