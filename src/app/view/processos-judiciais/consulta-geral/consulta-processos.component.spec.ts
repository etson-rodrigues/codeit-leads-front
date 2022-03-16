import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { MatDialogRef } from '@angular/material/dialog';

import { ConsultaProcessosComponent } from './consulta-processos.component';
import { ConsultaProcessosModule } from './consulta-processos.module';
import { ConsultaProcessosService } from 'src/app/core/services/consulta-processos/consulta-processos.service';
import { ExportarConsultaProcessosService } from 'src/app/core/services/exportar-consulta-processos/exportar-consulta-processos.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { mockConsultaProcessosResponse } from 'src/app/core/mocks/data/consulta-processos-mock';
import { formatarDataPtBr } from 'src/app/shared/utils/formatar-data';
import { CriterioData } from 'src/app/core/enums/criterio-data.enum';

describe('ConsultaProcessosComponent', () => {
  let component: ConsultaProcessosComponent;
  let fixture: ComponentFixture<ConsultaProcessosComponent>;
  let consultaProcessosService: jasmine.SpyObj<ConsultaProcessosService>;
  let exportarConsultaProcessosService: jasmine.SpyObj<ExportarConsultaProcessosService>;
  let messageTrackerService: jasmine.SpyObj<MessageTrackerService>;

  beforeEach(waitForAsync(() => {
    const consultaProcessosServiceSpy = jasmine.createSpyObj('ConsultaProcessosService', ['get']);
    const exportarConsultaProcessosServiceSpy = jasmine.createSpyObj('ExportarConsultaProcessosService', ['export']);
    const messageTrackerServiceSpy = jasmine.createSpyObj('MessageTrackerService', ['subscribeError']);

    TestBed.configureTestingModule({
      declarations: [
        ConsultaProcessosComponent
      ],
      imports: [
        ConsultaProcessosModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ConsultaProcessosService, useValue: consultaProcessosServiceSpy },
        { provide: ExportarConsultaProcessosService, useValue: exportarConsultaProcessosServiceSpy },
        { provide: MessageTrackerService, useValue: messageTrackerServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ConsultaProcessosComponent);
        component = fixture.componentInstance;
        consultaProcessosService = TestBed.inject(ConsultaProcessosService) as jasmine.SpyObj<ConsultaProcessosService>;
        exportarConsultaProcessosService = TestBed.inject(ExportarConsultaProcessosService) as jasmine.SpyObj<ExportarConsultaProcessosService>;
        messageTrackerService = TestBed.inject(MessageTrackerService) as jasmine.SpyObj<MessageTrackerService>;
        fixture.detectChanges();
      });
  }));

  it('[CIT-5680] deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('[CIT-5736] deve validar formulário vazio', () => {
    expect(component.formConsulta.valid).withContext('Formulário deve inicializar inválido').toBeFalsy();
  });

  it('[CIT-5736] deve validar campo de razão social', () => {
    const razaoSocialInput = component.formConsulta.get('razaoSocial');
    expect(razaoSocialInput!.valid).withContext('Campo razão social deve inicializar inválido').toBeFalsy();

    razaoSocialInput!.setValue('');
    fixture.detectChanges();
    expect(razaoSocialInput!.hasError('required')).withContext('Campo razão social é obrigatório').toBeTruthy();

    razaoSocialInput!.setValue('t');
    fixture.detectChanges();
    expect(razaoSocialInput!.hasError('minlength')).withContext('Campo razão social deve ter no mínimo 2 caracteres').toBeTruthy();

    razaoSocialInput!.setValue('Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus.');
    fixture.detectChanges();
    expect(razaoSocialInput!.hasError('maxlength')).withContext('Campo razão social deve ter no máximo 250 caracteres').toBeTruthy();

    razaoSocialInput!.setValue('teste');
    fixture.detectChanges();
    expect(razaoSocialInput!.valid).withContext('Campo razão social deve ser válido').toBeTruthy();
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
    consultaProcessosService.get.and.returnValue(of(mockConsultaProcessosResponse));
    let presentDate = new Date();
    let pastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    let formattedPresentDate = formatarDataPtBr(presentDate.toString());
    let formattedPastDate = formatarDataPtBr(pastDate.toString());

    const razaoSocialInput = component.formConsulta.get('razaoSocial');
    const criterioDataInput = component.formConsulta.get('criterioData');
    const dataInicialInput = component.formConsulta.get('dataInicial');
    const dataFinalInput = component.formConsulta.get('dataFinal');

    razaoSocialInput!.setValue('teste');
    criterioDataInput!.setValue('criacao');
    dataInicialInput!.setValue(pastDate);
    dataFinalInput!.setValue(presentDate);
    fixture.detectChanges();

    component.search();

    expect(component.searchParameters.razaoSocial).withContext('Campo razão social deve ser "teste"').toBe('teste');
    expect(component.searchParameters.criterioData).withContext('Campo critério por data deve ser "criacao"').toBe('criacao');
    expect(component.searchParameters.dataInicial).withContext(`Campo data inicial deve ser ${formattedPastDate}`).toBe(formattedPastDate);
    expect(component.searchParameters.dataFinal).withContext(`Campo data final deve ser ${formattedPresentDate}`).toBe(formattedPresentDate);
  });

  it('[CIT-5849] deve preencher variável filters com dados do searchParameters', () => {
    let presentDate = new Date();
    let pastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    let formattedPresentDate = formatarDataPtBr(presentDate.toString());
    let formattedPastDate = formatarDataPtBr(pastDate.toString());
    let searchParameters = {
      razaoSocial: 'teste',
      criterioData: 'ultimo-andamento',
      dataInicial: formattedPastDate,
      dataFinal: formattedPresentDate
    }

    expect(component.filters.length).withContext('Váriavel array filters deve inicializar vazia').toBe(0);

    component.addFilter(searchParameters);

    expect(component.filters.length).withContext('Váriavel array filters deve ter tamanho 4').toBe(4);
  });

  it('[CIT-5849] deve remover filtro selecionado da variável filters', () => {
    let searchParameters = {
      razaoSocial: 'teste',
      criterioData: 'ultima-atualizacao',
      dataInicial: null,
      dataFinal: formatarDataPtBr(new Date().toString())
    }
    let selecttedFilter = {
      key: "criterioData",
      name: "Critério por data: Última Atualização"
    };

    component.addFilter(searchParameters);

    expect(component.filters.length).withContext('Váriavel array filters deve ter tamanho 3').toBe(3);

    component.removeFilter(selecttedFilter);

    let isFilterRemoved = !component.filters.includes(selecttedFilter);

    expect(component.filters.length).withContext('Váriavel array filters deve ter tamanho 2').toBe(2);
    expect(isFilterRemoved).withContext('Deve ter sido removido o filtro correto').toBeTruthy();
    expect(isFilterRemoved).withContext('Deve ter sido removido o filtro correto').toBeTruthy();
  });

  it('[CIT-5736][CIT-5849] deve realizar consulta de processos', () => {
    let presentDate = new Date();
    let pastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    const razaoSocialInput = component.formConsulta.get('razaoSocial');
    const criterioDataInput = component.formConsulta.get('criterioData');
    const dataInicialInput = component.formConsulta.get('dataInicial');
    const dataFinalInput = component.formConsulta.get('dataFinal');

    razaoSocialInput!.setValue('teste');
    criterioDataInput!.setValue('criacao');
    dataInicialInput!.setValue(pastDate);
    dataFinalInput!.setValue(presentDate);
    fixture.detectChanges();

    consultaProcessosService.get.and.returnValue(of(mockConsultaProcessosResponse));
    component.search();
    expect(consultaProcessosService.get).withContext('Serviço de consulta deve ser chamado uma vez').toHaveBeenCalledTimes(1);
  });

  it('[CIT-5736][CIT-5849] deve retornar erro caso consulta de processos falhar', () => {
    let presentDate = new Date();
    let pastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    const razaoSocialInput = component.formConsulta.get('razaoSocial');
    const criterioDataInput = component.formConsulta.get('criterioData');
    const dataInicialInput = component.formConsulta.get('dataInicial');
    const dataFinalInput = component.formConsulta.get('dataFinal');

    razaoSocialInput!.setValue('teste');
    criterioDataInput!.setValue('criacao');
    dataInicialInput!.setValue(pastDate);
    dataFinalInput!.setValue(presentDate);
    fixture.detectChanges();

    consultaProcessosService.get.and.returnValue(throwError(() => new Error()));
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
    const razaoSocialInput = component.formConsulta.get('razaoSocial');
    razaoSocialInput!.setValue('teste');
    fixture.detectChanges();
    consultaProcessosService.get.and.returnValue(of(mockConsultaProcessosResponse));
    component.onPageChange(event);
    expect(consultaProcessosService.get).withContext('Serviço de consulta deve ser chamado uma vez').toHaveBeenCalledTimes(1);
  });

  it('[CIT-5736] deve retornar erro caso requisição de troca de página da consulta de processos falhar', () => {
    const event = {
      length: 10,
      pageIndex: 1,
      pageSize: 3,
      previousPageIndex: 0
    };
    const razaoSocialInput = component.formConsulta.get('razaoSocial');
    razaoSocialInput!.setValue('teste');
    fixture.detectChanges();
    consultaProcessosService.get.and.returnValue(throwError(() => new Error()));
    component.onPageChange(event);
    expect(messageTrackerService.subscribeError).withContext('Deve abrir o messageTracker ao gerar erro na consulta de processos').toHaveBeenCalledTimes(1);
  });

  it('[CIT-5736][CIT-5849] deve campos após limpar filtro', () => {
    let presentDate = new Date();
    let pastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

    const razaoSocialInput = component.formConsulta.get('razaoSocial');
    const criterioDataInput = component.formConsulta.get('criterioData');
    const dataInicialInput = component.formConsulta.get('dataInicial');
    const dataFinalInput = component.formConsulta.get('dataFinal');

    razaoSocialInput!.setValue('teste');
    criterioDataInput!.setValue('criacao');
    dataInicialInput!.setValue(pastDate);
    dataFinalInput!.setValue(presentDate);
    fixture.detectChanges();

    component.cleanFilter();

    expect(razaoSocialInput!.value).withContext('Campo razão social deve ser nulo após limpar filtro').toBeNull();
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
    expect(partesResult).withContext('Resultado deve estar formatado com quebra de linha').toBe('CLAER SERVICOS GERAIS EIRELI,' + '\r\n' + 'MUNICIPIO DE MACAE');

    partesResult = component.formatPartes(partesSixElement);
    expect(partesResult).withContext('Resultado deve estar formatado com "ENTRE OUTROS..." no final').toBe(
      'UBIRAJARA BELESA DO NASCIMENTO,' + '\r\n' +
      'VIRGINIA MARIA SOARES MORAIS,' + '\r\n' +
      'SAINT CLAIR INDUSTRIA E COMERCIO DE ALIMENTOS EIRE...' + '\r\n' +
      'VITORIO SERGIO SEVERINO DOS SANTOS,' + '\r\n' +
      'WAGNER BITTENCOURT DE OLIVEIRA,' + '\r\n' +
      'ENTRE OUTROS...');
  });

  it('[CIT-5881] deve realizar exportação dos processos pesquisados', () => {
    component.searchParameters = {
      razaoSocial: 'teste',
      criterioData: CriterioData.CriacaoProcesso,
      dataInicial: '01/03/2022',
      dataFinal: '01/03/2022'
    }

    const fakeResponse = new Blob([''], { type: 'text/csv' });
    spyOn(component['_dialog'], 'open').and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<typeof component>);
    exportarConsultaProcessosService.export.and.returnValue(of(fakeResponse));
    spyOn(component.downloadAnchor, 'click');
    component.export();
    expect(exportarConsultaProcessosService.export).withContext('Deve chamar serviço de exportação após confirmação do usuário').toHaveBeenCalled();
  })

  it('[CIT-5881] deve retornar erro caso exportação dos processos pesquisados falhar', () => {
    spyOn(component['_dialog'], 'open').and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<typeof component>);
    exportarConsultaProcessosService.export.and.returnValue(throwError(() => new Error()));
    component.export();
    expect(exportarConsultaProcessosService.export).withContext('Deve chamar serviço de exportação após confirmação do usuário').toHaveBeenCalled();
    expect(messageTrackerService.subscribeError).withContext('Deve abrir o messageTracker ao gerar erro na exportação dos processos').toHaveBeenCalled();
  })
});
