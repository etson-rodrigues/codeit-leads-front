import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { MatSelect } from '@angular/material/select';

import { Perfil } from 'src/app/core/models/perfil/perfil-response.model';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { PerfisService } from 'src/app/core/services/perfis/perfis.service';
import { emailValidator } from 'src/app/core/validators/email-validator';
import { validationInput } from 'src/app/core/validators/error-input';
import { inputFocus } from 'src/app/shared/utils/inputFocus';
import { EditarService } from 'src/app/core/services/editar/editar.service';
import { samePasswordValidator } from 'src/app/core/validators/same-password-validator';
import { ConsultaUsuarioView } from '../consulta/consulta.model';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
    usuario: ConsultaUsuarioView = {} as ConsultaUsuarioView;
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

    @Output() nextStep: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() isRegistered: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() isFinished: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() isEditing: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _perfisService: PerfisService,
        private _editarService: EditarService,
        private _changeDetector: ChangeDetectorRef,
        private _messageTrackerService: MessageTrackerService
    ) {
        this.formCadastro = this._formBuilder.group(
            {
                email: ['', [Validators.required, emailValidator, Validators.maxLength(50)]],
                senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
                confirmarSenha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
                perfil: ['', [Validators.required]]
            },
            {
                validator: samePasswordValidator('senha', 'confirmarSenha')
            } as AbstractControlOptions
        );
    }

    ngOnInit(): void {
        this.setUsuario();
        this.fillPerfilSelect();
        this.fillFormEditing();
    }

    setUsuario() {
        this._editarService.getValues.subscribe((data) => {
            this.usuario = (data != null && data != undefined) ? data as ConsultaUsuarioView : {} as ConsultaUsuarioView;
        });
    }

    fillFormEditing() {
        this._editarService.getValues.subscribe((data) => {
            if (data != null && data != undefined) {
                Object.entries(data).forEach(() => {
                    this.userID = data.id;
                    this.formCadastro.controls.email.patchValue(data.email);
                    this.formCadastro.controls.perfil.patchValue(data.perfil.codigo);
                });
            }
        });
    }

    fillPerfilSelect() {
        this._perfisService.getPerfis().subscribe({
            next: (response) => {
                this.perfis = response.data;
            },
            error: (error) => {
                this._messageTrackerService.subscribeError(error.error);
            }
        });
    }

    cancelar() {
        this.isFinished.emit(true);
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

    handleNextStep() {
        if (this.formCadastro.valid) {
            this.updateEditarService();
            this.nextStep.emit();
        }
    }

    private updateEditarService() {
        this.usuario.email = this.formCadastro.controls.email.value;
        this.usuario.senha = this.formCadastro.controls.confirmarSenha.value;
        this.usuario.perfil = {
            descricao: '',
            codigo: this.formCadastro.controls.perfil.value
        };
        this._editarService.setValues(this.usuario);
    }
}
