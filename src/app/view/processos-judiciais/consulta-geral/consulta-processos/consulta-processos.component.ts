import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ConsultaProcessosService } from 'src/app/core/services/consulta-processos/consulta-processos.service';
import { DetalhesProcessoService } from 'src/app/core/services/detalhes-processo/detalhes-processo.service';
import { ExportarProcessosService } from 'src/app/core/services/exportar-processos/exportar-processos.service';
import { StepperService } from 'src/app/core/services/stepper/stepper.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { ConsultaProcessosRequest } from 'src/app/core/models/consulta-processos/consulta-processos-request.model';
import { ConsultaProcessosResponseData } from 'src/app/core/models/consulta-processos/consulta-processos-response.model';
import { DetalhesProcesso } from 'src/app/core/models/detalhes-processo/detalhes-processo-response.model';
import { ConsultaProcessosFilterOptions, ConsultaProcessosSelectedFilters, ConsultaProcessosView } from './consulta-processos.model';
import { setPaginatorConfig } from 'src/app/core/config/paginator-config';
import { formatarDataPtBr } from 'src/app/shared/utils/formatar-data';
import { validationInput } from 'src/app/core/validators/error-input';
import { maxDateValidator } from 'src/app/core/validators/max-date-validator';
import { compareDateValidator } from 'src/app/core/validators/compare-date-validator';
import { dateFormatValidator } from 'src/app/core/validators/date-format-validator';
import { Uf } from 'src/app/core/enums/uf.enum';
import { CriterioData } from 'src/app/core/enums/criterio-data.enum';

@Component({
    selector: 'app-consulta-processos',
    templateUrl: './consulta-processos.component.html',
    styleUrls: ['./consulta-processos.component.scss']
})
export class ConsultaProcessosComponent implements OnInit {
    formConsulta: FormGroup = new FormGroup({});
    searchParameters!: ConsultaProcessosRequest;
    dateOptions: ConsultaProcessosFilterOptions[] = [
        { value: CriterioData.CriacaoProcesso, viewValue: 'Criação do Processo' },
        { value: CriterioData.UltimoAndamento, viewValue: 'Último Andamento' },
        { value: CriterioData.UltimaAtualizacao, viewValue: 'Última Atualização' }
    ];
    maxDate: Date = new Date();
    filters: ConsultaProcessosSelectedFilters[] = [];

    searchResult!: ConsultaProcessosView[];
    displayedColumns: string[] = ['nup', 'uf', 'partesAtivas', 'partesPassivas', 'primeiraData', 'dataUltimaAtualizacao', 'detalheProcesso'];

    totalRecords!: number;
    pageSize!: number;

    totalRecordsForExport: number = 100;

    downloadAnchor: HTMLAnchorElement = document.createElement('a');

    @ViewChild('formDirective') formDirective!: NgForm;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    @Output() detalhesProcesso: EventEmitter<DetalhesProcesso> = new EventEmitter();

    constructor(
        private _formBuilder: FormBuilder,
        private _consultaProcessosServices: ConsultaProcessosService,
        private _consultaProcessoDetalheService: DetalhesProcessoService,
        private _exportarConsultaProcessosService: ExportarProcessosService,
        private _stepperService: StepperService,
        private _dialog: MatDialog,
        private _spinnerService: NgxSpinnerService,
        private _messageTrackerService: MessageTrackerService
    ) {}

    ngOnInit(): void {
        this.formConsulta = this._formBuilder.group(
            {
                razaoSocial: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]],
                criterioData: [''],
                dataInicial: ['', [dateFormatValidator, maxDateValidator]],
                dataFinal: ['', [dateFormatValidator, maxDateValidator]]
            },
            {
                validator: compareDateValidator('dataInicial', 'dataFinal')
            } as AbstractControlOptions
        );
    }

    search() {
        if (this.formConsulta.valid) {
            let razaoSocialInput = this.formConsulta.controls.razaoSocial.value;

            let criterioDataInput: string = this.formConsulta.controls.criterioData.value;
            let dataInicialInput: Date = this.formConsulta.controls.dataInicial.value;
            let dataFinalInput: Date = this.formConsulta.controls.dataFinal.value;

            let criterioData: string | null = criterioDataInput ? criterioDataInput : null;
            let dataInicial: string | null = dataInicialInput ? formatarDataPtBr(dataInicialInput.toString()) : null;
            let dataFinal: string = dataFinalInput ? formatarDataPtBr(dataFinalInput.toString()) : formatarDataPtBr(new Date().toString());

            this.searchParameters = {
                razaoSocial: razaoSocialInput,
                criterioData,
                dataInicial,
                dataFinal
            };

            this.addFilter(this.searchParameters);

            this._spinnerService.show();
            this._consultaProcessosServices
                .get(this.searchParameters, 1, 10)
                .pipe(finalize(() => this._spinnerService.hide()))
                .subscribe({
                    next: (response) => {
                        this.searchResult = response.data.map((item: ConsultaProcessosResponseData) => {
                            return {
                                nup: item.numeroUnicoProtocolo,
                                uf: Uf[Number(item.uf.codigo)],
                                dataUltimaAtualizacao: formatarDataPtBr(item.dataUltimaAtualizacao),
                                partesAtivas: this.formatPartes(item.sumarioInstancias[0].partesAtivas),
                                partesPassivas: this.formatPartes(item.sumarioInstancias[0].partesPassivas),
                                primeiraData: formatarDataPtBr(item.sumarioInstancias[0].primeiraData)
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
    }

    onPageChange(event: PageEvent) {
        const pageNumber = event.pageIndex + 1;

        this._spinnerService.show();
        this._consultaProcessosServices
            .get(this.searchParameters, pageNumber, 10)
            .pipe(finalize(() => this._spinnerService.hide()))
            .subscribe({
                next: (response) => {
                    this.searchResult = response.data.map((item: ConsultaProcessosResponseData) => {
                        return {
                            nup: item.numeroUnicoProtocolo,
                            uf: Uf[Number(item.uf.codigo)],
                            dataUltimaAtualizacao: formatarDataPtBr(item.dataUltimaAtualizacao),
                            partesAtivas: this.formatPartes(item.sumarioInstancias[0].partesAtivas),
                            partesPassivas: this.formatPartes(item.sumarioInstancias[0].partesPassivas),
                            primeiraData: formatarDataPtBr(item.sumarioInstancias[0].primeiraData)
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

    processDetail(nup: string) {
        this._spinnerService.show();
        this._consultaProcessoDetalheService
            .get(nup)
            .pipe(finalize(() => this._spinnerService.hide()))
            .subscribe({
                next: (response) => {
                    this.detalhesProcesso.emit(response.data[0]);
                    this._stepperService.next();
                },
                error: (error) => {
                    this._messageTrackerService.subscribeError(error.error);
                }
            });
    }

    export() {
        const dialogRef = this._dialog.open(DialogComponent, {
            data: {
                titulo: `DESEJA EXPORTAR PARA PLANILHA TODOS OS DADOS DO RESULTADO DA PESQUISA?`,
                mensagem: '',
                tipo: 'question'
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._spinnerService.show();
                this._exportarConsultaProcessosService
                    .export(this.searchParameters)
                    .pipe(finalize(() => this._spinnerService.hide()))
                    .subscribe({
                        next: (response) => {
                            const file = new window.Blob([response], { type: 'text/csv' });
                            this.downloadAnchor.style.display = 'none';
                            const fileURL = URL.createObjectURL(file);
                            this.downloadAnchor.href = fileURL;
                            this.downloadAnchor.download = `planilha-${this.searchParameters.razaoSocial
                                .replace(/[^\w\s]/gi, '')
                                .trim()
                                .split(' ')
                                .join('')}.csv`;
                            this.downloadAnchor.click();
                        },
                        error: (error) => {
                            this._messageTrackerService.subscribeError(error.error);
                        }
                    });
            }
        });
    }

    addFilter(searchParameters: ConsultaProcessosRequest) {
        this.filters = [];
        let name: string;
        Object.entries(searchParameters).forEach(([key, value]) => {
            if (!value) {
                return;
            }
            switch (key) {
                case 'razaoSocial':
                    name = 'Razão Social';
                    break;
                case 'criterioData':
                    name = 'Critério por data';
                    break;
                case 'dataInicial':
                    name = 'Data Inicial';
                    break;
                case 'dataFinal':
                    name = 'Data Final';
                    break;
            }

            switch (value) {
                case CriterioData.CriacaoProcesso:
                    value = 'Criação do Processo';
                    break;
                case CriterioData.UltimoAndamento:
                    value = 'Último Andamento';
                    break;
                case CriterioData.UltimaAtualizacao:
                    value = 'Última Atualização';
                    break;
            }

            this.filters.push({ key: key, name: `${name}: ${value}` });
        });
    }

    cleanFilter() {
        this.formDirective.resetForm();
        this.filters = [];
    }

    removeFilter(filter: ConsultaProcessosSelectedFilters) {
        const index = this.filters.findIndex((filtro) => filtro.key == filter.key);

        if (index >= 0) {
            this.filters.splice(index, 1);
        }
        this.formConsulta.get(filter.key)?.reset();
    }

    validationInput(formControlName: string): string | undefined {
        return validationInput(this.formConsulta, formControlName);
    }

    formatPartes(partes: string[]) {
        if (partes.length == 0) return '';
        let partesArray: string[] = [];
        let sufix = '';
        let numberOfElements = 5;
        let numberOfCharacters = 50;
        if (partes.length > 1) {
            partes.slice(0, numberOfElements).forEach((parte) => {
                let lastChar = partes[partes.length - 1] === parte ? '' : ',';
                sufix = parte.length > numberOfCharacters ? '...' : lastChar;
                partesArray.push(parte.trim().slice(0, numberOfCharacters) + sufix);
            });
            if (partes.length > numberOfElements) {
                partesArray.push('ENTRE OUTROS...');
            }
            return partesArray.join('\r\n');
        }
        sufix = partes[0].length > numberOfCharacters ? '...' : '';
        return partes[0].trim().slice(0, numberOfCharacters) + sufix;
    }

    validateEmptyField(event: any, field: string) {
        if (!event.target.value.trim()) {
            this.formConsulta.controls[field].setValue(null);
            this.formConsulta.controls[field].setErrors(null);
            this.formConsulta.controls[field].markAsPristine();
            this.formConsulta.controls[field].markAsUntouched();
        }
    }
}
