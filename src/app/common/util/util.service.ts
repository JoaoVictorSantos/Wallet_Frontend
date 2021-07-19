import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CURRENT_USER } from './constants.util';

declare var swal: any;


@Injectable()
export class UtilService {

  constructor(private router: Router) { }

  public setToken(data: any): void {
    localStorage.setItem(CURRENT_USER, JSON.stringify(data));
  }

  public isLoggedIn(): boolean {
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER));
    return !currentUser || !currentUser.token ? false : true;
  }

  public getToken(): string {
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER));
    if(!currentUser || !currentUser.token) return null;
    return currentUser.token;
  }

  public logout(): void {
    localStorage.removeItem(CURRENT_USER);
  }

  public showErrorsForm(form: FormGroup): void {
    if(form){
      Object.keys(form.controls).forEach(key => {
        form.get(key).markAsTouched();
      });
    }
  }

  public goTo(route: string): void {
    if(route){
      this.router.navigate([route]);
    }
  }

  public messageError(text: string = 'Error', callback: Function = null): void {
    swal({
      title: 'Erro',
      text: text,
      type: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ok'
    })
    .then(callback);
  }

  public messageSuccess(text: string = 'Sucesso', callback: Function = null): void {
    swal('Sucesso', text, 'success')
    .then(callback);
  }

  public messageConfirmation(text: string = 'Confirmação',
  callback: Function = null): void {
    swal({
      title: 'Confirmação',
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Voltar'
    })
    .then(callback);
  }
}
