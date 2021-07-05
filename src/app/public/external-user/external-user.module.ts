import { UtilService } from './../../common/util/util.service';
import { UserService } from './../../common/service/user.service';
import { ExternalUserRoutingModule } from './external-user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalUserFormComponent } from './form/external-user-form.component';

@NgModule({
  imports: [
    CommonModule,
    ExternalUserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ExternalUserFormComponent],
  providers: [
    UserService,
    UtilService
  ]
})
export class ExternalUserModule { }
