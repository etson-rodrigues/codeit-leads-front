import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
import { ConsultaProcessosResponseData } from 'src/app/core/models/consulta-processos/consulta-processos-response.model';
import { DetalhesProcesso } from 'src/app/core/models/detalhes-processo/detalhes-processo-response.model';
import { ConsultaProcessosFilterOptions, ConsultaProcessosSelectedFilters, ConsultaProcessosView } from './consulta-processos.model';
import { ConsultaProcessosParameters } from 'src/app/core/models/consulta-processos/consulta-processos-parameters.model';
import { setPaginatorConfig } from 'src/app/core/config/paginator-config';
import { formatarDataPtBr } from 'src/app/shared/utils/formatar-data';
import { validationInput } from 'src/app/core/validators/error-input';
import { maxDateValidator } from 'src/app/core/validators/max-date-validator';
import { compareDateValidator } from 'src/app/core/validators/compare-date-validator';
import { dateFormatValidator } from 'src/app/core/validators/date-format-validator';
import { Uf } from 'src/app/core/enums/uf.enum';
import { CriterioData } from 'src/app/core/enums/criterio-data.enum';
import { Tribunal } from 'src/app/core/enums/tribunal.enum';
import { isCnpjTyped, razaoSocialCnpjValidator } from 'src/app/core/validators/razaoSocialCnpj-validator';

@Component({
    selector: 'app-consulta-processos',
    templateUrl: './consulta-processos.component.html',
    styleUrls: ['./consulta-processos.component.scss']
})
export class ConsultaProcessosComponent implements OnInit {
    formConsulta: FormGroup = new FormGroup({});
    searchParameters!: ConsultaProcessosParameters;
    dateOptions: ConsultaProcessosFilterOptions[] = [
        { value: CriterioData.CriacaoProcesso, viewValue: 'Criação do Processo' },
        { value: CriterioData.UltimoAndamento, viewValue: 'Último Andamento' },
        { value: CriterioData.UltimaAtualizacao, viewValue: 'Última Atualização' }
    ];
    tribunalOptions: ConsultaProcessosFilterOptions[] = [
        { value: Tribunal.STF, viewValue: 'STF - Supremo Tribunal Federal' },
        { value: Tribunal.CJF, viewValue: 'CJF - Conselho da Justiça Federal' },
        { value: Tribunal.CNJ, viewValue: 'CNJ - Conselho Nacional de Justiça' },
        { value: Tribunal.CSJT, viewValue: 'CSJT - Conselho Superior da Justiça do Trabalho' },
        { value: Tribunal.STJ, viewValue: 'STJ - Superior Tribunal de Justiça' },
        { value: Tribunal.TRF, viewValue: 'TRF - Tribunal Regional Federal' },
        { value: Tribunal.TJ, viewValue: 'TJ - Tribunal de Justiça' },
        { value: Tribunal.STM, viewValue: 'STM - Superior Tribunal Militar' },
        { value: Tribunal.TJM, viewValue: 'TJM - Tribunal de Justiça Militar' },
        { value: Tribunal.TST, viewValue: 'TST - Tribunal Superior do Trabalho' },
        { value: Tribunal.TRT, viewValue: 'TRT - Tribunal Regional do Trabalho' },
        { value: Tribunal.TSE, viewValue: 'TSE - Tribunal Superior Eleitoral' },
        { value: Tribunal.TRE, viewValue: 'TRE - Tribunal Regional Eleitoral' }
    ];
    ufOptions: ConsultaProcessosFilterOptions[] = [
        { value: Uf[Uf.AC], viewValue: 'Acre' },
        { value: Uf[Uf.AL], viewValue: 'Alagoas' },
        { value: Uf[Uf.AP], viewValue: 'Amapá' },
        { value: Uf[Uf.AM], viewValue: 'Amazonas' },
        { value: Uf[Uf.BA], viewValue: 'Bahia' },
        { value: Uf[Uf.CE], viewValue: 'Ceará' },
        { value: Uf[Uf.DF], viewValue: 'Distrito Federal' },
        { value: Uf[Uf.ES], viewValue: 'Espírito Santo' },
        { value: Uf[Uf.GO], viewValue: 'Goiás' },
        { value: Uf[Uf.MA], viewValue: 'Maranhão' },
        { value: Uf[Uf.MT], viewValue: 'Mato Grosso' },
        { value: Uf[Uf.MS], viewValue: 'Mato Grosso do Sul' },
        { value: Uf[Uf.MG], viewValue: 'Minas Gerais' },
        { value: Uf[Uf.PA], viewValue: 'Pará' },
        { value: Uf[Uf.PB], viewValue: 'Paraíba' },
        { value: Uf[Uf.PR], viewValue: 'Paraná' },
        { value: Uf[Uf.PE], viewValue: 'Pernambuco' },
        { value: Uf[Uf.PI], viewValue: 'Piauí' },
        { value: Uf[Uf.RJ], viewValue: 'Rio de Janeiro' },
        { value: Uf[Uf.RN], viewValue: 'Rio Grande do Norte' },
        { value: Uf[Uf.RS], viewValue: 'Rio Grande do Sul' },
        { value: Uf[Uf.RO], viewValue: 'Rondônia' },
        { value: Uf[Uf.RR], viewValue: 'Roraima' },
        { value: Uf[Uf.SC], viewValue: 'Santa Catarina' },
        { value: Uf[Uf.SP], viewValue: 'São Paulo' },
        { value: Uf[Uf.SE], viewValue: 'Sergipe' },
        { value: Uf[Uf.TO], viewValue: 'Tocantins' }
    ];
    tribunais = new FormControl([Tribunal.TST,Tribunal.TRT]);
    maxDate: Date = new Date();
    filters: ConsultaProcessosSelectedFilters[] = [];

    searchResult!: ConsultaProcessosView[];
    displayedColumns: string[] = ['nup', 'nomeInstancia', 'uf', 'partesAtivas', 'partesPassivas', 'primeiraData', 'dataUltimaAtualizacao', 'detalheProcesso'];

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
                razaoSocialCnpj: ['', [Validators.minLength(2), Validators.maxLength(250), razaoSocialCnpjValidator]],
                nup: ['', [Validators.minLength(25), Validators.maxLength(25)]],
                valorCausa: ['', [Validators.maxLength(15)]],
                criterioData: [''],
                dataInicial: ['', [dateFormatValidator, maxDateValidator]],
                dataFinal: ['', [dateFormatValidator, maxDateValidator]],
                uf: [{value: '', disabled: true}]
            },
            {
                validator: compareDateValidator('dataInicial', 'dataFinal')
            } as AbstractControlOptions
        );
    }

    search() {
        if (this.formConsulta.valid) {
            let razaoSocialCnpjInput: string = this.formConsulta.controls.razaoSocialCnpj.value;
            let nupInput: string = this.formConsulta.controls.nup.value;
            let valorCausaInput: number = this.formConsulta.controls.valorCausa.value;
            let criterioDataInput: string = this.formConsulta.controls.criterioData.value;
            let dataInicialInput: Date = this.formConsulta.controls.dataInicial.value;
            let dataFinalInput: Date = this.formConsulta.controls.dataFinal.value;
            let tribunaisInput: string[] = this.tribunais.value;
            let ufInput: string = this.formConsulta.controls.uf.value;

            let razaoSocialCnpj: string | null = razaoSocialCnpjInput ? razaoSocialCnpjInput : null;
            let nup: string | null = nupInput ? nupInput : null;
            let valorCausa: number | null = valorCausaInput ? valorCausaInput : null;
            let criterioData: string | null = criterioDataInput ? criterioDataInput : null;
            let dataInicial: string | null = dataInicialInput ? formatarDataPtBr(dataInicialInput.toString()) : null;
            let dataFinal: string = dataFinalInput ? formatarDataPtBr(dataFinalInput.toString()) : formatarDataPtBr(new Date().toString());
            let tribunais: string[] | null = tribunaisInput ? tribunaisInput : null;
            let uf: string | null = this.possuiTribunaisPesquisaveisComUf(tribunaisInput) && ufInput ? ufInput : null;

            this.searchParameters = {
                razaoSocialCnpj,
                nup,
                valorCausa,
                criterioData,
                dataInicial,
                dataFinal,
                tribunais,
                uf
            };

            this.addFilter(this.searchParameters);

            this._spinnerService.show();
            this._consultaProcessosServices
                .post(this.searchParameters, 1, 10)
                .pipe(finalize(() => this._spinnerService.hide()))
                .subscribe({
                    next: (response) => {
                        this.searchResult = response.data.map((item: ConsultaProcessosResponseData) => {
                            return {
                                nup: item.numeroUnicoProtocolo,
                                nomeInstancia: item.sumarioInstancias[0].nomeInstancia,
                                uf: Uf[Number(item.uf.codigo)],
                                dataUltimaAtualizacao: item.dataUltimaAtualizacao ? formatarDataPtBr(item.dataUltimaAtualizacao) : '',
                                partesAtivas: this.formatPartes(item.sumarioInstancias[0].partesAtivas),
                                partesPassivas: this.formatPartes(item.sumarioInstancias[0].partesPassivas),
                                primeiraData: item.sumarioInstancias[0].primeiraData ? formatarDataPtBr(item.sumarioInstancias[0].primeiraData) : ''
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
            .post(this.searchParameters, pageNumber, 10)
            .pipe(finalize(() => this._spinnerService.hide()))
            .subscribe({
                next: (response) => {
                    this.searchResult = response.data.map((item: ConsultaProcessosResponseData) => {
                        return {
                            nup: item.numeroUnicoProtocolo,
                            nomeInstancia: item.sumarioInstancias[0].nomeInstancia,
                            uf: Uf[Number(item.uf.codigo)],
                            dataUltimaAtualizacao: item.dataUltimaAtualizacao ? formatarDataPtBr(item.dataUltimaAtualizacao) : '',
                            partesAtivas: this.formatPartes(item.sumarioInstancias[0].partesAtivas),
                            partesPassivas: this.formatPartes(item.sumarioInstancias[0].partesPassivas),
                            primeiraData: item.sumarioInstancias[0].primeiraData ? formatarDataPtBr(item.sumarioInstancias[0].primeiraData) : ''
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

    export(isExportacaoComDetalhes: boolean) {
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
                    .export(this.searchParameters, isExportacaoComDetalhes)
                    .pipe(finalize(() => this._spinnerService.hide()))
                    .subscribe({
                        next: (response) => {
                            const file = new window.Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                            this.downloadAnchor.style.display = 'none';
                            const fileURL = URL.createObjectURL(file);
                            this.downloadAnchor.href = fileURL;
                            this.downloadAnchor.download = `planilha-${this.searchParameters.razaoSocialCnpj ?? formatarDataPtBr(new Date().toString())
                                .replace(/[^\w\s]/gi, '')
                                .trim()
                                .split(' ')
                                .join('')}.xlsx`;
                            this.downloadAnchor.click();
                        },
                        error: (error) => {
                            this._messageTrackerService.subscribeError(error.error);
                        }
                    });
            }
        });
    }

    addFilter(searchParameters: ConsultaProcessosParameters) {
        this.filters = [];
        let name: string;
        Object.entries(searchParameters).forEach(([key, value]) => {
            if (!value) {
                return;
            }
            switch (key) {
                case 'razaoSocialCnpj':
                    name = 'Razão Social / CNPJ';
                    break;
                case 'nup':
                    name = 'Número Único do Protocolo (NUP)';
                    break;
                case 'valorCausa':
                    name = 'Valor da Causa';
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
                case 'tribunais':
                    name = 'Tribunais';
                    break;
                case 'uf':
                    name = 'UF';
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
                case Uf[Uf.AC]:
                    value = 'Acre';
                    break;
                case Uf[Uf.AL]:
                    value = 'Alagoas';
                    break;
                case Uf[Uf.AP]:
                    value = 'Amapá';
                    break;
                case Uf[Uf.AM]:
                    value = 'Amazonas';
                    break;
                case Uf[Uf.BA]:
                    value = 'Bahia';
                    break;
                case Uf[Uf.CE]:
                    value = 'Ceará';
                    break;
                case Uf[Uf.DF]:
                    value = 'Distrito Federal';
                    break;
                case Uf[Uf.ES]:
                    value = 'Espírito Santo';
                    break;
                case Uf[Uf.GO]:
                    value = 'Goiás';
                    break;
                case Uf[Uf.MA]:
                    value = 'Maranhão';
                    break;
                case Uf[Uf.MT]:
                    value = 'Mato Grosso';
                    break;
                case Uf[Uf.MS]:
                    value = 'Mato Grosso do Sul';
                    break;
                case Uf[Uf.MG]:
                    value = 'Minas Gerais';
                    break;
                case Uf[Uf.PA]:
                    value = 'Pará';
                    break;
                case Uf[Uf.PB]:
                    value = 'Paraíba';
                    break;
                case Uf[Uf.PR]:
                    value = 'Paraná';
                    break;
                case Uf[Uf.PE]:
                    value = 'Pernambuco';
                    break;
                case Uf[Uf.PI]:
                    value = 'Piauí';
                    break;
                case Uf[Uf.RJ]:
                    value = 'Rio de Janeiro';
                    break;
                case Uf[Uf.RN]:
                    value = 'Rio Grande do Norte';
                    break;
                case Uf[Uf.RS]:
                    value = 'Rio Grande do Sul';
                    break;
                case Uf[Uf.RO]:
                    value = 'Rondônia';
                    break;
                case Uf[Uf.RR]:
                    value = 'Roraima';
                    break;
                case Uf[Uf.SC]:
                    value = 'Santa Catarina';
                    break;
                case Uf[Uf.SP]:
                    value = 'São Paulo';
                    break;
                case Uf[Uf.SE]:
                    value = 'Sergipe';
                    break;
                case Uf[Uf.TO]:
                    value = 'Tocantins';
                    break;                    
            }

            this.filters.push({ key: key, name: `${name}: ${value}` });
        });
    }

    cleanFilter() {
        this.formDirective.resetForm();
        this.filters = [];
        this.tribunais.reset();
    }

    removeFilter(filter: ConsultaProcessosSelectedFilters) {
        const index = this.filters.findIndex((filtro) => filtro.key == filter.key);

        if (index >= 0) {
            this.filters.splice(index, 1);
        }

        if (filter.key.toUpperCase() == 'TRIBUNAIS') {
            this.tribunais.reset();
        } else {
            this.formConsulta.get(filter.key)?.reset();
        }        
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

    getCnpjMask(): string {
        const razaoSocialCnpjInput = this.formConsulta.controls.razaoSocialCnpj.value;

        return isCnpjTyped(razaoSocialCnpjInput) ? '00.000.000/0000-00' : '';
    }

    possuiTribunaisPesquisaveisComUf(tribunais: string[]): boolean {
        return tribunais.filter(x => x  == Tribunal.TJ || x  == Tribunal.TJM || x  == Tribunal.TRE).length > 0;
    }

    onTribunaisChange() {
        const tribunaisInput: string[] = this.tribunais.value;

        if (tribunaisInput.length > 0 && this.possuiTribunaisPesquisaveisComUf(tribunaisInput)) {
            this.formConsulta.controls.uf.enable();
        }
        else {
            this.formConsulta.controls.uf.disable();
        }        
    }
}
