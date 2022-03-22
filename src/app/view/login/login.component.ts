import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

import { ChavesCookies } from 'src/app/core/enums/cookie.enum';
import { ChavesLocalStorage } from 'src/app/core/enums/local-storage.enum';
import { LoginRequest } from 'src/app/core/models/login/login-request.model';
import { AutenticacaoService } from 'src/app/core/services/autenticacao/autenticacao.service';
import { CookiesService } from 'src/app/core/services/cookies/cookies.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { emailValidator } from 'src/app/core/validators/email-validator';
import { validationInput } from 'src/app/core/validators/error-input';

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
        private _cookieService: CookiesService,
        private _localStorageService: LocalStorageService,
        private _router: Router,
        private _spinnerService: NgxSpinnerService,
        private _messageTrackerService: MessageTrackerService
    ) {}

    ngOnInit() {
        this.formLogin = this._formBuilder.group({
            email: ['', [Validators.required, Validators.maxLength(50), emailValidator]],
            senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
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
        };

        this._spinnerService.show();
        this._autenticacaoService
            .login(dados)
            .pipe(
                finalize(() => {
                    this._spinnerService.hide();
                })
            )
            .subscribe({
                next: (response) => {
                    this._cookieService.setCookie(ChavesCookies.Token, response.data.accessToken, 240);
                    this._localStorageService.setItemLocalStorage(JSON.stringify(response.data), ChavesLocalStorage.UserInfo);
                    if (response.data.redefinirSenha) {
                        return this._router.navigate(['redefinir-senha']);
                    }
                    this._router.navigate(['processos-judiciais/consulta-geral']);
                },
                error: (error) => {
                    this._messageTrackerService.subscribeError(error.error);
                }
            });
    }
}
