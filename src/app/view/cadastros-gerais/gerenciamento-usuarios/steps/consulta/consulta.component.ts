import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { CadastroUsuariosService } from 'src/app/core/services/cadastro-usuarios/cadastro-usuarios.service';
import { EditarService } from 'src/app/core/services/editar/editar.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { setPaginatorConfig } from 'src/app/core/config/paginator-config';
import { ConsultaUsuarioView } from './consulta.model';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { ResumoService } from 'src/app/core/services/resumo/resumo.service';
import { ConsultaUsuarioResponseData } from 'src/app/core/models/gerenciamento-usuarios/consulta-usuario-response.model';
import { AlteracaoUsuarioRequest } from 'src/app/core/models/gerenciamento-usuarios/alteracao-usuario-request.model';

@Component({
    selector: 'app-consulta',
    templateUrl: './consulta.component.html',
    styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
    formConsulta: FormGroup = new FormGroup({});
    emailInputValue: string = '';

    displayedColumns: string[] = ['email', 'perfil', 'ativo', 'editar', 'desativar'];
    searchResult: ConsultaUsuarioView[] = [];
    triggerSearch: boolean = false;
    totalRecords: number = 0;
    pageSize: number = 0;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    @Output() nextStep: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() isEditing: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() isUpdatedStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _cadastroUsuariosService: CadastroUsuariosService,
        private _editarService: EditarService,
        private _resumoService: ResumoService,
        private _spinnerService: NgxSpinnerService,
        private _dialog: MatDialog,
        private _messageTrackerService: MessageTrackerService
    ) {
        this.formConsulta = this._formBuilder.group({
            email: ['']
        });
    }

    ngOnInit(): void { }

    search() {
        this.triggerSearch = true;
        this.emailInputValue = this.formConsulta.controls.email.value;
        this._spinnerService.show();
        this._cadastroUsuariosService
            .get(this.emailInputValue, 1, 10)
            .pipe(finalize(() => this._spinnerService.hide()))
            .subscribe({
                next: (response) => {
                    this.searchResult = response.data.map((item: ConsultaUsuarioResponseData) => {
                        return {
                            id: item.id,
                            email: item.email,
                            senha: '',
                            perfil: item.perfil,
                            status: {
                                ativo: item.ativo,
                                descricao: item.ativo ? 'Ativo' : 'Inativo'
                            },
                            usuarioDBJus: {
                                nome: item.usuarioDBJus.nome,
                                senha: item.usuarioDBJus.senha,
                                quantidadeCreditos: item.usuarioDBJus.quantidadeCreditos
                            }
                        };
                    });

                    this.totalRecords = response.totalRecords;
                    this.pageSize = response.pageSize;
                    this.paginator.firstPage();
                    setPaginatorConfig(this.paginator);
                },
                error: (error) => {
                    this._messageTrackerService.subscribeError(error.error);
                }
            });
    }

    onPageChange(event: PageEvent) {
        const pageNumber = event.pageIndex + 1;
        this._spinnerService.show();
        this._cadastroUsuariosService
            .get(this.emailInputValue, pageNumber, 10)
            .pipe(finalize(() => this._spinnerService.hide()))
            .subscribe({
                next: (response) => {
                    this.searchResult = response.data.map((item: ConsultaUsuarioResponseData) => {
                        return {
                            id: item.id,
                            email: item.email,
                            senha: '',
                            perfil: item.perfil,
                            status: {
                                ativo: item.ativo,
                                descricao: item.ativo ? 'Ativo' : 'Inativo'
                            },
                            usuarioDBJus: {
                                nome: item.usuarioDBJus.nome,
                                senha: item.usuarioDBJus.senha,
                                quantidadeCreditos: item.usuarioDBJus.quantidadeCreditos
                            }
                        };
                    });

                    this.totalRecords = response.totalRecords;
                    this.pageSize = response.pageSize;
                    setPaginatorConfig(this.paginator);
                },
                error: (error) => {
                    this._messageTrackerService.subscribeError(error.error);
                }
            });
    }

    cleanFilter() {
        this.formConsulta.controls.email.setValue('');
    }

    edit(element: ConsultaUsuarioView) {
        this._editarService.setValues(element);
        this.isEditing.emit(true);
        this.nextStep.emit();
        this.triggerSearch = false;
        this.searchResult = [];
    }

    updateStatus(element: ConsultaUsuarioView) {
        const data = {
            id: element.id,
            email: element.email,
            status: !element.status.ativo
        };
        const dialogRef = this._dialog.open(DialogComponent, {
            data: {
                titulo: `DESEJA ${data.status ? 'REATIVAR' : 'DESATIVAR'} O USU??RIO?`,
                mensagem: data.email,
                tipo: 'question'
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const userData: AlteracaoUsuarioRequest = {
                    id: data.id,
                    ativo: data.status
                };
                this._cadastroUsuariosService
                    .updateStatus(userData)
                    .pipe(finalize(() => this._spinnerService.hide()))
                    .subscribe({
                        next: (response) => {
                            this.isUpdatedStatus.emit(true);
                            this._resumoService.setValues(response, true);
                            this.triggerSearch = false;
                            this.searchResult = [];
                        },
                        error: (error) => {
                            this._messageTrackerService.subscribeError(error.error);
                        }
                    });
            }
        });
    }

    handleNextStep() {
        this._editarService.setValues(null);
        this.nextStep.emit();
        this.isEditing.emit(false);
        this.triggerSearch = false;
        this.searchResult = [];
    }
}
