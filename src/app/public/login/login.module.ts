import { UtilService } from './../../common/util/util.service';
import { LoginService } from './../../common/service/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginFormComponent } from './form/login-form.component';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginFormComponent],
  providers: [
    LoginService,
    UtilService
  ]
})
export class LoginModule { }