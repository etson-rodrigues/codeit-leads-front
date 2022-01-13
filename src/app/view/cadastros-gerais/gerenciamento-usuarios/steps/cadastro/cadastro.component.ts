import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
import { EditarService } from 'src/app/core/services/editar/editar.service';
import { mustBeTheSame } from 'src/app/core/validators/same-password-validator';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  formCadastro!: FormGroup;
  perfis: Perfil[] = [];
  userID: number = 0;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  listRef: any[] = [];

  @ViewChild('formDirective') formDirective!: NgForm;
  @ViewChild('emailRef') emailRef!: ElementRef;
  @ViewChild('senhaRef') senhaRef!: ElementRef;
  @ViewChild('confirmarSenhaRef') confirmarSenhaRef!: ElementRef;
  @ViewChild('perfilRef') perfilRef!: MatSelect;

  @Output() isRegistered: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() previousStep: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() isEditing: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _cadastroUsuariosService: CadastroUsuariosService,
    private _perfisService: PerfisService,
    private _resumoService: ResumoService,
    private _editarService: EditarService,
    private _spinner: NgxSpinnerService,
    private _changeDetector: ChangeDetectorRef,
    private _messageTrackerService: MessageTrackerService
  ) {
    this.formCadastro = this._formBuilder.group({
      email: ['', [Validators.required, emailValidator, Validators.maxLength(50)]],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      perfil: ['', [Validators.required]]
    }, {
      validator: mustBeTheSame('senha', 'confirmarSenha')
    } as AbstractControlOptions);
  }

  ngOnInit(): void {
    this.fillPerfilSelect();
    this.fillFormEditing();
  }

  fillFormEditing() {
    this._editarService.getValues.subscribe(data => {
      Object.entries(data).forEach(() => {
        this.userID = data.id;
        this.formCadastro.controls.email.patchValue(data.email);
        this.formCadastro.controls.perfil.patchValue(data.perfil.codigo);
      });
    });
  }

  fillPerfilSelect() {
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
          codigo: this.formCadastro.controls.perfil.value
        },
        ativo: true,
        redefinirSenha: true
      };

      this._spinner.show();
      this._cadastroUsuariosService
        .save(data, this.isEditing, this.userID)
        .pipe(finalize(() => this._spinner.hide()))
        .subscribe(
          {
            next: (response) => {
              this.isRegistered.emit(true);
              this.userID = 0;
              this._resumoService.setValues(response, this.isEditing);
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

  validationInput(formControlName: string): string | undefined {
    return validationInput(this.formCadastro, formControlName);
  }

  changeFocus() {
    this.listRef = [this.emailRef, this.senhaRef, this.confirmarSenhaRef, this.perfilRef];
    inputFocus(this.formCadastro, this.listRef, this._changeDetector);
  }
}
