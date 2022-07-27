import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { MatDialogRef } from '@angular/material/dialog';

import { ProcessosModule } from '../processos.module';
import { ConsultaProcessosComponent } from './consulta-processos.component';
import { ConsultaProcessosService } from 'src/app/core/services/consulta-processos/consulta-processos.service';
import { DetalhesProcessoService } from 'src/app/core/services/detalhes-processo/detalhes-processo.service';
import { ExportarProcessosService } from 'src/app/core/services/exportar-processos/exportar-processos.service';
import { StepperService } from 'src/app/core/services/stepper/stepper.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { mockConsultaProcessosResponse } from 'src/app/core/mocks/data/consulta-processos-mock';
import { mockDetalhesProcessoResponse } from 'src/app/core/mocks/data/detalhes-processo-mock';
import { formatarDataPtBr } from 'src/app/shared/utils/formatar-data';
import { CriterioData } from 'src/app/core/enums/criterio-data.enum';

describe('ConsultaProcessosComponent', () => {
    let component: ConsultaProcessosComponent;
    let fixture: ComponentFixture<ConsultaProcessosComponent>;
    let consultaProcessosService: jasmine.SpyObj<ConsultaProcessosService>;
    let consultaProcessoDetalheService: jasmine.SpyObj<DetalhesProcessoService>;
    let exportarConsultaProcessosService: jasmine.SpyObj<ExportarProcessosService>;
    let stepperService: jasmine.SpyObj<StepperService>;
    let messageTrackerService: jasmine.SpyObj<MessageTrackerService>;

    beforeEach(
        waitForAsync(() => {
            const consultaProcessosServiceSpy = jasmine.createSpyObj('ConsultaProcessosService', ['post']);
            const consultaProcessoDetalheServiceSpy = jasmine.createSpyObj('ConsultaProcessoDetalheService', ['get']);
            const exportarConsultaProcessosServiceSpy = jasmine.createSpyObj('ExportarConsultaProcessosService', ['export']);
            const stepperServiceSpy = jasmine.createSpyObj('StepperService', ['next']);
            const messageTrackerServiceSpy = jasmine.createSpyObj('MessageTrackerService', ['subscribeError']);

            TestBed.configureTestingModule({
                declarations: [ConsultaProcessosComponent],
                imports: [ProcessosModule, RouterTestingModule, NoopAnimationsModule],
                providers: [
                    { provide: ConsultaProcessosService, useValue: consultaProcessosServiceSpy },
                    { provide: DetalhesProcessoService, useValue: consultaProcessoDetalheServiceSpy },
                    { provide: ExportarProcessosService, useValue: exportarConsultaProcessosServiceSpy },
                    { provide: StepperService, useValue: stepperServiceSpy },
                    { provide: MessageTrackerService, useValue: messageTrackerServiceSpy }
                ],
                schemas: [NO_ERRORS_SCHEMA]
            })
                .compileComponents()
                .then(() => {
                    fixture = TestBed.createComponent(ConsultaProcessosComponent);
                    component = fixture.componentInstance;
                    consultaProcessosService = TestBed.inject(ConsultaProcessosService) as jasmine.SpyObj<ConsultaProcessosService>;
                    consultaProcessoDetalheService = TestBed.inject(DetalhesProcessoService) as jasmine.SpyObj<DetalhesProcessoService>;
                    exportarConsultaProcessosService = TestBed.inject(ExportarProcessosService) as jasmine.SpyObj<ExportarProcessosService>;
                    stepperService = TestBed.inject(StepperService) as jasmine.SpyObj<StepperService>;
                    messageTrackerService = TestBed.inject(MessageTrackerService) as jasmine.SpyObj<MessageTrackerService>;
                    fixture.detectChanges();
                });
        })
    );

    it('[CIT-5680] deve criar', () => {
        expect(component).toBeTruthy();
    });

    it('[CIT-5736] deve validar formulário vazio', () => {
        expect(component.formConsulta.valid).withContext('Formulário deve inicializar válido').toBeTruthy();
    });

    it('[CIT-5736] deve validar campo de razão social', () => {
        const razaoSocialCnpjInput = component.formConsulta.get('razaoSocialCnpj');
        expect(razaoSocialCnpjInput!.valid).withContext('Campo razão social deve inicializar válido').toBeTruthy();

        razaoSocialCnpjInput!.setValue('t');
        fixture.detectChanges();
        expect(razaoSocialCnpjInput!.hasError('minlength')).withContext('Campo razão social deve ter no mínimo 2 caracteres').toBeTruthy();

        razaoSocialCnpjInput!.setValue(
            'Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus.'
        );
        fixture.detectChanges();
        expect(razaoSocialCnpjInput!.hasError('maxlength')).withContext('Campo razão social deve ter no máximo 250 caracteres').toBeTruthy();

        razaoSocialCnpjInput!.setValue('teste');
        fixture.detectChanges();
        expect(razaoSocialCnpjInput!.valid).withContext('Campo razão social deve ser válido').toBeTruthy();
    });

    it('[CIT-5924] deve validar campo de Razão Social / CNPJ com CNPJ informado', () => {
        const razaoSocialCnpjInput = component.formConsulta.get('razaoSocialCnpj');

        razaoSocialCnpjInput!.setValue('7648381');
        fixture.detectChanges();
        expect(razaoSocialCnpjInput!.hasError('errorCnpj')).withContext('CNPJ incorreto ou inválido.').toBeTruthy();

        razaoSocialCnpjInput!.setValue('01234567891234');
        fixture.detectChanges();
        expect(razaoSocialCnpjInput!.hasError('errorCnpj')).withContext('CNPJ incorreto ou inválido.').toBeTruthy();

        razaoSocialCnpjInput!.setValue('76483817000120');
        fixture.detectChanges();
        expect(razaoSocialCnpjInput!.valid).withContext('Campo razão social deve ser válido').toBeTruthy();
    });

    it('[CIT-5924] deve validar máscara do campo de Razão Social / CNPJ', () => {
        const razaoSocialCnpjInput = component.formConsulta.get('razaoSocialCnpj');

        razaoSocialCnpjInput!.setValue('teste');
        fixture.detectChanges();
        expect(component.getCnpjMask()).withContext('Campo razão social não deve ter máscara.').toBe('');

        razaoSocialCnpjInput!.setValue('764838');
        fixture.detectChanges();
        expect(component.getCnpjMask()).withContext('Campo razão social não deve ter máscara.').toBe('');

        razaoSocialCnpjInput!.setValue('7648381');
        fixture.detectChanges();
        expect(component.getCnpjMask()).withContext('Campo razão social deve ter máscara para CNPJ.').toBe('00.000.000/0000-00');

        razaoSocialCnpjInput!.setValue('76483817000120');
        fixture.detectChanges();
        expect(component.getCnpjMask()).withContext('Campo razão social deve ter máscara para CNPJ.').toBe('00.000.000/0000-00');

        razaoSocialCnpjInput!.setValue('76.483.817/0001-20');
        fixture.detectChanges();
        expect(component.getCnpjMask()).withContext('Campo razão social deve ter máscara para CNPJ.').toBe('00.000.000/0000-00');
    });

    it('[CIT-5985] deve validar campo Nup', () => {
        const nupInput = component.formConsulta.get('nup');
        expect(nupInput!.valid).withContext('Campo Nup deve inicializar válido').toBeTruthy();

        nupInput!.setValue('1');
        fixture.detectChanges();
        expect(nupInput!.hasError('minlength')).withContext('Campo Nup deve ter no mínimo 25 caracteres').toBeTruthy();

        nupInput!.setValue('0002900-68.2016.8.16.003512345');
        fixture.detectChanges();
        expect(nupInput!.hasError('maxlength')).withContext('Campo Nup deve ter no máximo 25 caracteres').toBeTruthy();

        nupInput!.setValue('0002900-68.2016.8.16.0035');
        fixture.detectChanges();
        expect(nupInput!.valid).withContext('Campo Nup deve ser válido').toBeTruthy();
    });

    it('[CIT-5985] deve validar campo Valor Causa', () => {
        const valorCausaInput = component.formConsulta.get('valorCausa');
        expect(valorCausaInput!.valid).withContext('Campo Valor Causa deve inicializar válido').toBeTruthy();

        valorCausaInput!.setValue('1234567890123456');
        fixture.detectChanges();
        expect(valorCausaInput!.hasError('maxlength')).withContext('Campo Valor Causa deve ter no máximo 15 caracteres').toBeTruthy();

        valorCausaInput!.setValue('123456789012345');
        fixture.detectChanges();
        expect(valorCausaInput!.valid).withContext('Campo Valor Causa deve ser válido').toBeTruthy();
    });

    it('[CIT-5849] deve validar o campo critério por data', () => {
        const criterioDataInput = component.formConsulta.get('criterioData');
        expect(criterioDataInput!.value).withContext('Campo critério por data deve inicializar vazio').toBe('');

        criterioDataInput?.setValue(null);
        expect(criterioDataInput!.value).withContext('Campo critério por data deve ser nulo').toBeNull();

        criterioDataInput?.setValue(CriterioData.CriacaoProcesso);
        expect(criterioDataInput!.value).withContext('Campo critério por data deve ser "PrimeiraData"').toBe('PrimeiraData');

        criterioDataInput?.setValue(CriterioData.UltimoAndamento);
        expect(criterioDataInput!.value).withContext('Campo critério por data deve ser "UltimoAndamento"').toBe('UltimoAndamento');

        criterioDataInput?.setValue(CriterioData.UltimaAtualizacao);
        expect(criterioDataInput!.value).withContext('Campo critério por data deve ser "UltimaData"').toBe('UltimaData');
    });

    it('[CIT-5849] deve validar o campo data inicial', () => {
        const dataInicialInput = component.formConsulta.get('dataInicial');
        expect(dataInicialInput!.value).withContext('Campo data inicial deve inicializar vazio').toBe('');

        let futureDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        dataInicialInput!.setValue(futureDate);
        fixture.detectChanges();

        expect(dataInicialInput!.hasError('errorDataMax')).withContext('Campo data inicial não pode ser maior que data atual').toBeTruthy();
    });

    it('[CIT-5849] deve validar o campo data final', () => {
        const dataInicialInput = component.formConsulta.get('dataInicial');
        const dataFinalInput = component.formConsulta.get('dataFinal');
        expect(dataFinalInput!.value).withContext('Campo data final deve inicializar vazio').toBe('');

        let futureDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        let presentDate = new Date();
        let pastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

        dataFinalInput!.setValue(futureDate);
        fixture.detectChanges();
        expect(dataFinalInput!.hasError('errorDataMax')).withContext('Campo data final não pode ser maior que data atual').toBeTruthy();

        dataInicialInput!.setValue(presentDate);
        dataFinalInput!.setValue(pastDate);
        fixture.detectChanges();

        expect(dataFinalInput!.hasError('dataFinalDeveSerMaiorDataInicial')).withContext('Campo data final não pode ser menor que data inicial').toBeTruthy();
    });

    it('[CIT-5849] deve preencher variável searchParameters com dados do formulário', () => {
        consultaProcessosService.post.and.returnValue(of(mockConsultaProcessosResponse));
        let presentDate = new Date();
        let pastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        let formattedPresentDate = formatarDataPtBr(presentDate.toString());
        let formattedPastDate = formatarDataPtBr(pastDate.toString());

        const razaoSocialCnpjInput = component.formConsulta.get('razaoSocialCnpj');
        const criterioDataInput = component.formConsulta.get('criterioData');
        const dataInicialInput = component.formConsulta.get('dataInicial');
        const dataFinalInput = component.formConsulta.get('dataFinal');

        razaoSocialCnpjInput!.setValue('teste');
        criterioDataInput!.setValue(CriterioData.CriacaoProcesso);
        dataInicialInput!.setValue(pastDate);
        dataFinalInput!.setValue(presentDate);
        fixture.detectChanges();

        component.search();

        expect(component.searchParameters.razaoSocialCnpj).withContext('Campo razão social deve ser "teste"').toBe('teste');
        expect(component.searchParameters.criterioData).withContext('Campo critério por data deve ser "criacao"').toBe('PrimeiraData');
        expect(component.searchParameters.dataInicial).withContext(`Campo data inicial deve ser ${formattedPastDate}`).toBe(formattedPastDate);
        expect(component.searchParameters.dataFinal).withContext(`Campo data final deve ser ${formattedPresentDate}`).toBe(formattedPresentDate);
    });

    it('[CIT-5849] deve preencher variável filters com dados do searchParameters', () => {
        let presentDate = new Date();
        let pastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        let formattedPresentDate = formatarDataPtBr(presentDate.toString());
        let formattedPastDate = formatarDataPtBr(pastDate.toString());
        let searchParameters = {
            razaoSocialCnpj: 'teste',
            nup: null,
            valorCausa: null,
            criterioData: CriterioData.UltimoAndamento,
            dataInicial: formattedPastDate,
            dataFinal: formattedPresentDate,
            tribunais: null,
            uf: null
        };

        expect(component.filters.length).withContext('Váriavel array filters deve inicializar vazia').toBe(0);

        component.addFilter(searchParameters);

        expect(component.filters.length).withContext('Váriavel array filters deve ter tamanho 4').toBe(4);
    });

    it('[CIT-5849] deve remover filtro selecionado da variável filters', () => {
        let searchParameters = {
            razaoSocialCnpj: 'teste',
            nup: null,
            valorCausa: null,
            criterioData: 'ultima-atualizacao',
            dataInicial: null,
            dataFinal: formatarDataPtBr(new Date().toString()),
            tribunais: null,
            uf: null
        };
        let selecttedFilter = {
            key: 'criterioData',
            name: 'Critério por data: Última Atualização'
        };

        component.addFilter(searchParameters);

        expect(component.filters.length).withContext('Váriavel array filters deve ter tamanho 3').toBe(3);

        component.removeFilter(selecttedFilter);

        let isFilterRemoved = !component.filters.includes(selecttedFilter);

        expect(component.filters.length).withContext('Váriavel array filters deve ter tamanho 2').toBe(2);
        expect(isFilterRemoved).withContext('Deve ter sido removido o filtro correto').toBeTruthy();
    });

    it('[CIT-5736][CIT-5849] deve realizar consulta de processos', () => {
        let presentDate = new Date();
        let pastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        const razaoSocialCnpjInput = component.formConsulta.get('razaoSocialCnpj');
        const criterioDataInput = component.formConsulta.get('criterioData');
        const dataInicialInput = component.formConsulta.get('dataInicial');
        const dataFinalInput = component.formConsulta.get('dataFinal');

        razaoSocialCnpjInput!.setValue('teste');
        criterioDataInput!.setValue(CriterioData.UltimaAtualizacao);
        dataInicialInput!.setValue(pastDate);
        dataFinalInput!.setValue(presentDate);
        fixture.detectChanges();

        consultaProcessosService.post.and.returnValue(of(mockConsultaProcessosResponse));
        component.search();
        expect(consultaProcessosService.post).withContext('Serviço de consulta deve ser chamado uma vez').toHaveBeenCalledTimes(1);
    });

    it('[CIT-5736][CIT-5849] deve retornar erro caso consulta de processos falhar', () => {
        let presentDate = new Date();
        let pastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        const razaoSocialCnpjInput = component.formConsulta.get('razaoSocialCnpj');
        const criterioDataInput = component.formConsulta.get('criterioData');
        const dataInicialInput = component.formConsulta.get('dataInicial');
        const dataFinalInput = component.formConsulta.get('dataFinal');

        razaoSocialCnpjInput!.setValue('teste');
        criterioDataInput!.setValue('criacao');
        dataInicialInput!.setValue(pastDate);
        dataFinalInput!.setValue(presentDate);
        fixture.detectChanges();

        consultaProcessosService.post.and.returnValue(throwError(() => new Error()));
        component.search();
        expect(messageTrackerService.subscribeError).withContext('Deve abrir o messageTracker ao gerar erro na consulta de processos').toHaveBeenCalledTimes(1);
    });

    it('[CIT-5736] deve realizar requisição de troca de página da consulta de processos', () => {
        const event = {
            length: 10,
            pageIndex: 1,
            pageSize: 3,
            previousPageIndex: 0
        };
        const razaoSocialCnpjInput = component.formConsulta.get('razaoSocialCnpj');
        razaoSocialCnpjInput!.setValue('teste');
        fixture.detectChanges();
        consultaProcessosService.post.and.returnValue(of(mockConsultaProcessosResponse));
        component.onPageChange(event);
        expect(consultaProcessosService.post).withContext('Serviço de consulta deve ser chamado uma vez').toHaveBeenCalledTimes(1);
    });

    it('[CIT-5736] deve retornar erro caso requisição de troca de página da consulta de processos falhar', () => {
        const event = {
            length: 10,
            pageIndex: 1,
            pageSize: 3,
            previousPageIndex: 0
        };
        const razaoSocialCnpjInput = component.formConsulta.get('razaoSocialCnpj');
        razaoSocialCnpjInput!.setValue('teste');
        fixture.detectChanges();
        consultaProcessosService.post.and.returnValue(throwError(() => new Error()));
        component.onPageChange(event);
        expect(messageTrackerService.subscribeError).withContext('Deve abrir o messageTracker ao gerar erro na consulta de processos').toHaveBeenCalledTimes(1);
    });

    it('[CIT-5736][CIT-5849] deve limpar campos após limpar filtro', () => {
        let presentDate = new Date();
        let pastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

        const razaoSocialCnpjInput = component.formConsulta.get('razaoSocialCnpj');
        const criterioDataInput = component.formConsulta.get('criterioData');
        const dataInicialInput = component.formConsulta.get('dataInicial');
        const dataFinalInput = component.formConsulta.get('dataFinal');

        razaoSocialCnpjInput!.setValue('teste');
        criterioDataInput!.setValue('criacao');
        dataInicialInput!.setValue(pastDate);
        dataFinalInput!.setValue(presentDate);
        fixture.detectChanges();

        component.cleanFilter();

        expect(razaoSocialCnpjInput!.value).withContext('Campo razão social deve ser nulo após limpar filtro').toBeNull();
        expect(criterioDataInput!.value).withContext('Campo critério por data deve ser nulo após limpar filtro').toBeNull();
        expect(dataInicialInput!.value).withContext('Campo data inicial deve ser nulo após limpar filtro').toBeNull();
        expect(dataFinalInput!.value).withContext('Campo data final deve ser nulo após limpar filtro').toBeNull();
    });

    it('[CIT-5849] deve formatar partes ativas e passivas', () => {
        let partesEmpty: string[] = [];
        let partesOneElement: string[] = ['CLAIR PACHECO'];
        let partesGreaterThan50: string[] = ['SAINT CLAIR INDUSTRIA E COMERCIO DE ALIMENTOS EIRELI - ME'];
        let partesTwoElement: string[] = ['CLAER SERVICOS GERAIS EIRELI', 'MUNICIPIO DE MACAE'];
        let partesSixElement: string[] = [
            'UBIRAJARA BELESA DO NASCIMENTO',
            'VIRGINIA MARIA SOARES MORAIS',
            'SAINT CLAIR INDUSTRIA E COMERCIO DE ALIMENTOS EIRELI - ME',
            'VITORIO SERGIO SEVERINO DOS SANTOS',
            'WAGNER BITTENCOURT DE OLIVEIRA',
            'WAGNER GOMES BUSSE JUNIOR'
        ];

        let partesResult = component.formatPartes(partesEmpty);
        expect(partesResult).withContext('Resultado deve estar vazio').toBe('');

        partesResult = component.formatPartes(partesOneElement);
        expect(partesResult).withContext('Resultado deve ser a mesma string de entrada').toBe('CLAIR PACHECO');

        partesResult = component.formatPartes(partesGreaterThan50);
        expect(partesResult).withContext('Resultado deve estar formatado com "..." no final').toBe('SAINT CLAIR INDUSTRIA E COMERCIO DE ALIMENTOS EIRE...');

        partesResult = component.formatPartes(partesTwoElement);
        expect(partesResult)
            .withContext('Resultado deve estar formatado com quebra de linha')
            .toBe('CLAER SERVICOS GERAIS EIRELI,' + '\r\n' + 'MUNICIPIO DE MACAE');

        partesResult = component.formatPartes(partesSixElement);
        expect(partesResult)
            .withContext('Resultado deve estar formatado com "ENTRE OUTROS..." no final')
            .toBe(
                'UBIRAJARA BELESA DO NASCIMENTO,' +
                    '\r\n' +
                    'VIRGINIA MARIA SOARES MORAIS,' +
                    '\r\n' +
                    'SAINT CLAIR INDUSTRIA E COMERCIO DE ALIMENTOS EIRE...' +
                    '\r\n' +
                    'VITORIO SERGIO SEVERINO DOS SANTOS,' +
                    '\r\n' +
                    'WAGNER BITTENCOURT DE OLIVEIRA,' +
                    '\r\n' +
                    'ENTRE OUTROS...'
            );
    });

    it('[CIT-5870] deve realizar consulta de detalhe do processo', () => {
        consultaProcessoDetalheService.get.and.returnValue(of(mockDetalhesProcessoResponse));

        const nup = '0000984-73.2017.5.12.0019';
        component.processDetail(nup);

        expect(stepperService.next).withContext('Método next do serviço stepper deve ser chamado uma vez').toHaveBeenCalledTimes(1);
        expect(consultaProcessoDetalheService.get).withContext('Serviço de consulta de detalhe do processo deve ser chamado uma vez').toHaveBeenCalledTimes(1);
        expect(messageTrackerService.subscribeError).withContext('MessageTracker não deve ser chamado').toHaveBeenCalledTimes(0);
    });

    it('[CIT-5870] deve retornar erro caso requisição de detalhe do processo falhar', () => {
        consultaProcessoDetalheService.get.and.returnValue(throwError(() => new Error()));

        const nup = '0000984-73.2017.5.12.0019';
        component.processDetail(nup);

        expect(stepperService.next).withContext('Método next do serviço stepper não deve ser chamado').toHaveBeenCalledTimes(0);
        expect(consultaProcessoDetalheService.get).withContext('Serviço de consulta de detalhe do processo deve ser chamado uma vez').toHaveBeenCalledTimes(1);
        expect(messageTrackerService.subscribeError).withContext('Deve abrir o messageTracker ao gerar erro na consulta de processos').toHaveBeenCalledTimes(1);
    });

    it('[CIT-5881] deve realizar exportação dos processos pesquisados', () => {
        component.searchParameters = {
            razaoSocialCnpj: 'teste',
            nup: null,
            valorCausa: null,
            criterioData: CriterioData.CriacaoProcesso,
            dataInicial: '01/03/2022',
            dataFinal: '01/03/2022',
            tribunais: null,
            uf: null
        };

        const fakeResponse = new Blob([''], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        spyOn(component['_dialog'], 'open').and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<typeof component>);
        exportarConsultaProcessosService.export.and.returnValue(of(fakeResponse));
        spyOn(component.downloadAnchor, 'click');
        component.export(false);
        expect(exportarConsultaProcessosService.export).withContext('Deve chamar serviço de exportação após confirmação do usuário').toHaveBeenCalled();
    });

    it('[CIT-5881] deve retornar erro caso exportação dos processos pesquisados falhar', () => {
        spyOn(component['_dialog'], 'open').and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<typeof component>);
        exportarConsultaProcessosService.export.and.returnValue(throwError(() => new Error()));
        component.export(false);
        expect(exportarConsultaProcessosService.export).withContext('Deve chamar serviço de exportação após confirmação do usuário').toHaveBeenCalled();
        expect(messageTrackerService.subscribeError).withContext('Deve abrir o messageTracker ao gerar erro na exportação dos processos').toHaveBeenCalled();
    });
});
