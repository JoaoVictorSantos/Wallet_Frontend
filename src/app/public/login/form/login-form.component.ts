import { UtilService } from './../../../common/util/util.service';
import { LoginService } from './../../../common/service/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEX_EMAIL } from 'app/common/util/constants.util';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;

  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder,
              public utilService: UtilService) { }

  ngOnInit() {
    if(this.utilService.isLoggedIn()){
      this.utilService.logout();
    }
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(REGEX_EMAIL)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  public submit(): void {
    if(this.form.invalid){
      this.utilService.showErrorsForm(this.form);
      return;
    }

    this.signIn();
  }

  private signIn(): void {
    this.loginService.signIn(this.form.value)
    .subscribe(
      response => {
        if(response && response.data){
          this.utilService.setToken(response.data);
          this.utilService.messageSuccess("Bem-vindo")
          this.utilService.goTo("/app/wallet");
        }
      }
    );
  }
}
