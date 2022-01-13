import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { Autenticacao } from 'src/app/core/models/autenticacao';
import { AutenticacaoService } from 'src/app/core/services/autenticacao/autenticacao.service';
import { CadastroUsuariosService } from 'src/app/core/services/cadastro-usuarios/cadastro-usuarios.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { validationInput } from 'src/app/core/validators/error-input';
import { mustBeTheSame } from 'src/app/core/validators/same-password-validator';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { inputFocus } from 'src/app/shared/utils/inputFocus';
import { CadastroUsuarioRequest } from '../cadastros-gerais/gerenciamento-usuarios/steps/cadastro/cadastro.model';

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
  loginData!: Autenticacao;

  @ViewChild('senhaRef') senhaRef!: ElementRef;
  @ViewChild('confirmarSenhaRef') confirmarSenhaRef!: ElementRef;

  constructor(
    private _formBuilder: FormBuilder,
    private _cadastroUsuariosService: CadastroUsuariosService,
    private _autenticacaoService: AutenticacaoService,
    private _router: Router,
    private _dialog: MatDialog,
    private _spinner: NgxSpinnerService,
    private _changeDetector: ChangeDetectorRef,
    private _messageTrackerService: MessageTrackerService
  ) { }

  ngOnInit(): void {
    this.loginData = this._autenticacaoService.getLoginInfo();

    this.formRedefinirSenha = this._formBuilder.group({
      senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    }, {
      validator: mustBeTheSame('senha', 'confirmarSenha')
    } as AbstractControlOptions);
  }

  changePassword() {
    if (this.formRedefinirSenha.valid) {
      const data: CadastroUsuarioRequest = {
        email: this.loginData.email,
        senha: this.formRedefinirSenha.controls.confirmarSenha.value,
        perfil: {
          codigo: this.loginData.perfil.codigo
        },
        ativo: true,
        redefinirSenha: false
      };

      this._spinner.show();
      this._cadastroUsuariosService
        .save(data, true, this.loginData.id)
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
