import { UserService } from './../../../common/service/user.service';
import { UtilService } from './../../../common/util/util.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEX_EMAIL } from 'app/common/util/constants.util';
import { User } from 'app/common/model/user';

@Component({
  selector: 'app-external-user-form',
  templateUrl: './external-user-form.component.html',
  styleUrls: ['./external-user-form.component.css']
})
export class ExternalUserFormComponent implements OnInit {

  form: FormGroup;

  constructor(private userService: UserService,
              private utilService: UtilService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern(REGEX_EMAIL)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      role: ['ROLE_USER', [
        Validators.required
      ]]
    });
  }

  public onSubmit(): void {
    if(this.form.invalid){
      this.utilService.showErrorsForm(this.form);
      return;
    }
    this.save();
  }

  private save(): void {
    this.userService.save(this.form.value as User)
    .subscribe(
      response => {
        if(response &&  response.data && response.data.id){
          this.utilService.messageSuccess("Usuário cadastrado com sucesso!",
          () => this.utilService.goTo("/auth/login"));
        }
      }
    );
  }
}
