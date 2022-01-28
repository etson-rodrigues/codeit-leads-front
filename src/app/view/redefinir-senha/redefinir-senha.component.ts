import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { validationInput } from 'src/app/core/validators/error-input';
import { mustBeTheSame } from 'src/app/core/validators/same-password-validator';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { inputFocus } from 'src/app/shared/utils/inputFocus';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { ChavesLocalStorage } from 'src/app/core/enums/local-storage.enum';
import { ChavesCookies } from 'src/app/core/enums/cookie.enum';
import { CookiesService } from 'src/app/core/services/cookies/cookies.service';
import { Autenticacao } from 'src/app/core/models/autenticacao/autenticacao.model';
import { CadastroUsuarioRequest } from 'src/app/core/models/gerenciamento-usuarios/cadastro-usuario-request.model';
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
    private _cookieService: CookiesService,
    private _localStorageService: LocalStorageService,
    private _router: Router,
    private _dialog: MatDialog,
    private _spinner: NgxSpinnerService,
    private _changeDetector: ChangeDetectorRef,
    private _messageTrackerService: MessageTrackerService
  ) { }

  ngOnInit(): void {
    this.loginInfo = JSON.parse(this._localStorageService.getItemLocalStorage(ChavesLocalStorage.UserInfo) || '{}');

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

      this._spinner.show();
      this._redefinirSenhaService
        .redefinePassword(this.loginInfo.id, novaSenha)
        .pipe(finalize(() => this._spinner.hide()))
        .subscribe(
          {
            next: () => {
              this.openDialog();
            },
            error: (error) => {
              this._messageTrackerService.subscribeError(error.error);
            }
          }
        );
    }
  }

  openDialog() {
    const dialogRef = this._dialog.open(DialogComponent, {
      data: {
        titulo: 'SENHA ALTERADA COM SUCESSO',
        mensagem: 'Por favor realizar o acesso novamente',
        tipo: 'informative'
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this._cookieService.deleteCookie(ChavesCookies.Token);
      this._router.navigate(['login']);
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