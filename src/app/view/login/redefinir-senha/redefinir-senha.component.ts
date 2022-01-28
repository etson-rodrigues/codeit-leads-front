import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { AutenticacaoService } from 'src/app/core/services/autenticacao/autenticacao.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { validationInput } from 'src/app/core/validators/error-input';
import { mustBeTheSame } from 'src/app/core/validators/same-password-validator';
import { inputFocus } from 'src/app/shared/utils/inputFocus';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { CookiesService } from 'src/app/core/services/cookies/cookies.service';
import { ChavesCookies } from 'src/app/core/enums/cookie.enum';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { ChavesLocalStorage } from 'src/app/core/enums/local-storage.enum';
import { LoginRequest } from 'src/app/core/models/login/login-request.model';
import { Autenticacao } from 'src/app/core/models/autenticacao/autenticacao.model';
import { RedefinirSenhaService } from 'src/app/core/services/redefinir-senha/redefinir-senha.service';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.scss']
})
export class RedefinirSenhaComponent implements OnInit {
  formRedefinirSenha: FormGroup = new FormGroup({});
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  listRef: any[] = [];
  loginInfo!: Autenticacao;

  @ViewChild('senhaRef') senhaRef!: ElementRef;
  @ViewChild('confirmarSenhaRef') confirmarSenhaRef!: ElementRef;

  constructor(
    private _formBuilder: FormBuilder,
    private _redefinirSenhaService: RedefinirSenhaService,
    private _autenticacaoService: AutenticacaoService,
    private _cookieService: CookiesService,
    private _localStorageService: LocalStorageService,
    private _router: Router,
    private _dialog: MatDialog,
    private _spinnerService: NgxSpinnerService,
    private _changeDetector: ChangeDetectorRef,
    private _messageTrackerService: MessageTrackerService
  ) { }

  ngOnInit(): void {
    this.formRedefinirSenha = this._formBuilder.group({
      senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    }, {
      validator: mustBeTheSame('senha', 'confirmarSenha')
    } as AbstractControlOptions);
  }

  changePassword() {
    if (this.formRedefinirSenha.valid) {
      const novaSenha: string = this.formRedefinirSenha.controls.confirmarSenha.value;
      this.loginInfo = JSON.parse(this._localStorageService.getItemLocalStorage(ChavesLocalStorage.UserInfo) || '{}');

      this._spinnerService.show();
      this._redefinirSenhaService
        .redefinePassword(this.loginInfo.id, novaSenha)
        .pipe(finalize(() => this._spinnerService.hide()))
        .subscribe(
          {
            next: () => {
              this.login();
            },
            error: (error) => {
              this._messageTrackerService.subscribeError(error.error);
            }
          }
        );
    }
  }

  login() {
    const loginData: LoginRequest = {
      email: this.loginInfo.email,
      senha: this.formRedefinirSenha.controls.confirmarSenha.value
    };

    this._spinnerService.show();
    this._autenticacaoService
      .login(loginData)
      .pipe(finalize(() => {
        this._spinnerService.hide();
      }))
      .subscribe({
        next: (response) => {
          this._cookieService.setCookie(ChavesCookies.Token, response.data.accessToken, 240);
          this._localStorageService.setItemLocalStorage(JSON.stringify(response.data), ChavesLocalStorage.UserInfo);
          this.openDialog();
        },
        error: (error) => {
          this._messageTrackerService.subscribeError(error.error);
        }
      });
  }

  openDialog() {
    const dialogRef = this._dialog.open(DialogComponent, {
      data: {
        titulo: 'SENHA REDEFINIDA COM SUCESSO',
        mensagem: '',
        tipo: 'informative'
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this._router.navigate(['processos-judiciais/consulta-geral']);
    });
  }

  validationInput(formControlName: string): string | undefined {
    return validationInput(this.formRedefinirSenha, formControlName);
  }

  changeFocus() {
    this.listRef = [this.senhaRef, this.confirmarSenhaRef];
    inputFocus(this.formRedefinirSenha, this.listRef, this._changeDetector);
  }
}