import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

import { MatSelect } from '@angular/material/select';

import { Perfil } from 'src/app/core/models/perfil';
import { CadastroUsuariosService } from 'src/app/core/services/cadastro-usuarios/cadastro-usuarios.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { PerfisService } from 'src/app/core/services/perfis/perfis.service';
import { emailValidator } from 'src/app/core/validators/email-validator';
import { validationInput } from 'src/app/core/validators/error-input';
import { inputFocus } from 'src/app/shared/utils/inputFocus';
import { CadastroUsuarioRequest } from './cadastro.model';
import { ResumoService } from 'src/app/core/services/resumo/resumo.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  formCadastro!: FormGroup;
  perfis: Perfil[] = [];

  @ViewChild('formDirective') formDirective!: NgForm;

  @ViewChild('emailRef') emailRef!: ElementRef;
  @ViewChild('senhaRef') senhaRef!: ElementRef;
  @ViewChild('confirmarSenhaRef') confirmarSenhaRef!: ElementRef;
  @ViewChild('perfilRef') perfilRef!: MatSelect;
  listRef: any[] = [];

  @Output() isRegistered: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() previousStep: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private _formBuilder: FormBuilder,
    private _cadastroUsuariosService: CadastroUsuariosService,
    private _perfisService: PerfisService,
    private _spinner: NgxSpinnerService,
    private _changeDetector: ChangeDetectorRef,
    private _messageTrackerService: MessageTrackerService,
    private _resumoService: ResumoService
  ) {
    this.formCadastro = this._formBuilder.group({
      email: ['', [Validators.required, emailValidator, Validators.maxLength(50)]],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      perfil: ['', [Validators.required]]
    }, {
      validator: this.mustBeTheSame('senha', 'confirmarSenha')
    } as AbstractControlOptions);
  }

  ngOnInit(): void {
    this.populatePerfilSelect();
  }

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  populatePerfilSelect() {
    this._perfisService
      .getPerfis()
      .subscribe(
        {
          next: (response) => {
            this.perfis = response.data;
          },
          error: (error) => {
            this._messageTrackerService.subscribeError(error.error);
          }
        }
      );
  }

  register() {
    if (this.formCadastro.valid) {
      const data: CadastroUsuarioRequest = {
        email: this.formCadastro.controls.email.value,
        senha: this.formCadastro.controls.confirmarSenha.value,
        perfil: {
          codigo: this.formCadastro.controls.perfil.value.codigo
        }
      };

      this._spinner.show();
      this._cadastroUsuariosService
        .save(data)
        .pipe(finalize(() => this._spinner.hide()))
        .subscribe(
          {
            next: (response) => {
              this.isRegistered.emit(true);
              this._resumoService.setValues(response.body!)
            },
            error: (error) => {
              this._messageTrackerService.subscribeError(error.error);
            }
          }
        );
    }
  }

  handlePreviousStep() {
    this.previousStep.emit();
    this.resetForm();
  }

  resetForm() {
    this.formDirective.resetForm();
  }

  mustBeTheSame(senha: string, confirmarSenha: string) {
    return (controls: AbstractControl) => {
      const controlSenha = controls.get(senha);
      const controlConfirmarSenha = controls.get(confirmarSenha);

      if (controlConfirmarSenha?.errors && !controlConfirmarSenha.errors.devemSerSenhasIguais) {
        return;
      }

      if (controlSenha?.value !== controlConfirmarSenha?.value) {
        controlConfirmarSenha?.setErrors({ devemSerSenhasIguais: true });
      } else {
        controlConfirmarSenha?.setErrors(null);
      }
    }
  }

  validationInput(formControlName: string): string | undefined {
    return validationInput(this.formCadastro, formControlName);
  }

  changeFocus() {
    this.listRef = [this.emailRef, this.senhaRef, this.confirmarSenhaRef, this.perfilRef];
    inputFocus(this.formCadastro, this.listRef, this._changeDetector);
  }
}
