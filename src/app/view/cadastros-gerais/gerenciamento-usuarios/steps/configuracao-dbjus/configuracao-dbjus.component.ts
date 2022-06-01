import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { CadastroUsuarioRequest } from 'src/app/core/models/gerenciamento-usuarios/cadastro-usuario-request.model';
import { CadastroUsuariosService } from 'src/app/core/services/cadastro-usuarios/cadastro-usuarios.service';
import { EditarService } from 'src/app/core/services/editar/editar.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { ResumoService } from 'src/app/core/services/resumo/resumo.service';
import { validationInput } from 'src/app/core/validators/error-input';
import { inputFocus } from 'src/app/shared/utils/inputFocus';
import { ConsultaUsuarioView } from '../consulta/consulta.model';

@Component({
  selector: 'app-configuracao-dbjus',
  templateUrl: './configuracao-dbjus.component.html',
  styleUrls: ['./configuracao-dbjus.component.scss']
})
export class ConfiguracaoDbjusComponent implements OnInit {
  usuario: ConsultaUsuarioView = {} as ConsultaUsuarioView;
  formConfiguracaoDBJus!: FormGroup;
  userID: number = 0;
  hidePassword: boolean = true;
  listRef: any[] = [];

  @ViewChild('formDirective') formDirective!: NgForm;
  @ViewChild('nomeRef') nomeRef!: ElementRef;
  @ViewChild('senhaDBJusRef') senhaDBJusRef!: ElementRef;
  @ViewChild('quantidadeCreditosRef') quantidadeCreditosRef!: ElementRef;

  @Output() isRegistered: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() previousStep: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() isEditing: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _cadastroUsuariosService: CadastroUsuariosService,
    private _resumoService: ResumoService,
    private _editarService: EditarService,
    private _spinnerService: NgxSpinnerService,
    private _changeDetector: ChangeDetectorRef,
    private _messageTrackerService: MessageTrackerService
  ) {
    this.formConfiguracaoDBJus = this._formBuilder.group(
      {
        nome: ['', [Validators.required, Validators.maxLength(100)]],
        senhaDBJus: ['', [Validators.required, Validators.maxLength(100)]],
        quantidadeCreditos: ['', [Validators.required, Validators.maxLength(15)]]
      }
    );
  }

  ngOnInit(): void {
    this.setUsuario();
    this.fillFormEditing();
  }

  setUsuario() {
    this._editarService.getValues.subscribe((data) => {
      this.usuario = (data != null && data != undefined) ? data as ConsultaUsuarioView : {} as ConsultaUsuarioView;
    });
  }

  fillFormEditing() {
    this._editarService.getValues.subscribe((data) => {
      if (data != null && data != undefined && data.usuarioDBJus != null && data.usuarioDBJus != undefined) {
        Object.entries(data).forEach(() => {
          this.userID = data.id;
          this.formConfiguracaoDBJus.controls.nome.patchValue(data.usuarioDBJus.nome);
          this.formConfiguracaoDBJus.controls.senhaDBJus.patchValue(data.usuarioDBJus.senha);
          this.formConfiguracaoDBJus.controls.quantidadeCreditos.patchValue(data.usuarioDBJus.quantidadeCreditos);
        });
      }
    });
  }

  register() {
    if (this.formConfiguracaoDBJus.valid) {
      const data: CadastroUsuarioRequest = {
        email: this.usuario.email,
        senha: this.usuario.senha,
        perfil: {
          codigo: this.usuario.perfil.codigo
        },
        ativo: true,
        redefinirSenha: true,
        usuarioDBJus: {
          nome: this.formConfiguracaoDBJus.controls.nome.value,
          senha: this.formConfiguracaoDBJus.controls.senhaDBJus.value,
          quantidadeCreditos: this.formConfiguracaoDBJus.controls.quantidadeCreditos.value
        }
      };

      this._spinnerService.show();
      this._cadastroUsuariosService
        .save(data, this.isEditing, this.userID)
        .pipe(finalize(() => this._spinnerService.hide()))
        .subscribe({
          next: (response) => {
            this.isRegistered.emit(true);
            this.userID = 0;
            this._resumoService.setValues(response, this.isEditing);
          },
          error: (error) => {
            this._messageTrackerService.subscribeError(error.error);
          }
        });
    }
  }

  handlePreviousStep() {
    this.previousStep.emit();
  }

  resetForm() {
    this.formDirective.resetForm();
  }

  validationInput(formControlName: string): string | undefined {
    return validationInput(this.formConfiguracaoDBJus, formControlName);
  }

  changeFocus() {
    this.listRef = [this.nomeRef, this.senhaDBJusRef, this.quantidadeCreditosRef];
    inputFocus(this.formConfiguracaoDBJus, this.listRef, this._changeDetector);
  }

}
