import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

import { AutenticacaoService } from 'src/app/core/services/autenticacao/autenticacao.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { emailValidator } from 'src/app/core/validators/email-validator';
import { validationInput } from 'src/app/core/validators/error-input';
import { LoginRequest } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _autenticacaoService: AutenticacaoService,
    private _router: Router,
    private _spinner: NgxSpinnerService,
    private _messageTrackerService: MessageTrackerService
  ) { }

  ngOnInit() {
    this.formLogin = this._formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(50), emailValidator]],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    });
  }

  hidePassword: boolean = true;

  validationInput(formControlName: string): string | undefined {
    return validationInput(this.formLogin, formControlName);
  }

  login() {
    const dados: LoginRequest = {
      email: this.formLogin.value['email'],
      senha: this.formLogin.value['senha']
    }

    this._spinner.show();
    this._autenticacaoService
      .login(dados)
      .pipe(finalize(() => {
        this._spinner.hide();
      }))
      .subscribe({
        next: (response) => {
          console.log(response);
          this._autenticacaoService.isLoggedIn = true;
          this._autenticacaoService.setLoginInfo(response.body!);
        },
        error: (error) => {
          this._messageTrackerService.subscribeError(error.error);
        },
        complete: () => {
          this._router.navigate(['consulta-processos']);
        },
      });
  }
}
