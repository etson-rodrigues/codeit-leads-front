import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { SituacaoConsulta } from 'src/app/core/enums/situacao-consulta.enum';
import { TipoConsulta } from 'src/app/core/enums/tipo-consulta.enum';
import { mockLoginResponse } from 'src/app/core/mocks/data/autenticacao-mock';
import { mockHistoricoConsultasAnaliticoResponse } from 'src/app/core/mocks/data/historico-consultas-mock';
import { ExportarHistoricoConsultasService } from 'src/app/core/services/exportar-historico-consultas/exportar-historico-consultas.service';
import { HistoricoConsultasService } from 'src/app/core/services/historico-consultas/historico-consultas.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { formatarDataPtBr } from 'src/app/shared/utils/formatar-data';
import { HistoricoConsultasAnaliticoModule } from '../historico-consultas-analitico.module';

import { HistoricoConsultasAnaliticoVisualizarHistoricosComponent } from './historico-consultas-analitico-visualizar-historicos.component';

describe('HistoricoConsultasAnaliticoVisualizarHistoricosComponent', () => {
  let component: HistoricoConsultasAnaliticoVisualizarHistoricosComponent;
  let fixture: ComponentFixture<HistoricoConsultasAnaliticoVisualizarHistoricosComponent>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let historicoConsultasService: jasmine.SpyObj<HistoricoConsultasService>;
  let exportarHistoricoConsultasService: jasmine.SpyObj<ExportarHistoricoConsultasService>;
  let messageTrackerService: jasmine.SpyObj<MessageTrackerService>;

  beforeEach(
    waitForAsync(() => {
        const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['getItemLocalStorage']);
        const historicoConsultasServiceSpy = jasmine.createSpyObj('HistoricoConsultasService', ['getSinteticoBy', 'getAnaliticoBy', 'getSaldoDisponivel']);
        const exportarHistoricoConsultasServiceSpy = jasmine.createSpyObj('ExportarHistoricoConsultasService', ['exportSintetico', 'exportAnalitico']);
        const messageTrackerServiceSpy = jasmine.createSpyObj('MessageTrackerService', ['subscribeError']);

        TestBed.configureTestingModule({
            declarations: [HistoricoConsultasAnaliticoVisualizarHistoricosComponent],
            imports: [HistoricoConsultasAnaliticoModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule],
            providers: [
                { provide: LocalStorageService, useValue: localStorageServiceSpy },
                { provide: HistoricoConsultasService, useValue: historicoConsultasServiceSpy },
                { provide: ExportarHistoricoConsultasService, useValue: exportarHistoricoConsultasServiceSpy },
                { provide: MessageTrackerService, useValue: messageTrackerServiceSpy },
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: {} }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(HistoricoConsultasAnaliticoVisualizarHistoricosComponent);
                component = fixture.componentInstance;
                localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
                historicoConsultasService = TestBed.inject(HistoricoConsultasService) as jasmine.SpyObj<HistoricoConsultasService>;
                exportarHistoricoConsultasService = TestBed.inject(ExportarHistoricoConsultasService) as jasmine.SpyObj<ExportarHistoricoConsultasService>;
                messageTrackerService = TestBed.inject(MessageTrackerService) as jasmine.SpyObj<MessageTrackerService>;                
                localStorageService.getItemLocalStorage.and.returnValue(JSON.stringify(mockLoginResponse.data));
                fixture.detectChanges();
            });
    })
  );

  it('[CIT-5985] deve criar', fakeAsync(() => {
    expect(component).toBeTruthy();
    flush();
  }));

  it('[CIT-5985] deve validar o campo tipo consulta', () => {
    const tipoConsultaInput = component.formConsulta.get('tipoConsulta');
    expect(tipoConsultaInput!.value).withContext('Campo tipo consulta deve inicializar vazio').toBe('');

    tipoConsultaInput?.setValue(null);
    expect(tipoConsultaInput!.value).withContext('Campo tipo consulta deve ser nulo').toBeNull();

    tipoConsultaInput?.setValue(TipoConsulta.Pesquisa);
    expect(tipoConsultaInput!.value).withContext('Campo tipo consulta deve ser "Pesquisa"').toBe('Pesquisa');

    tipoConsultaInput?.setValue(TipoConsulta.DetalhesProcesso);
    expect(tipoConsultaInput!.value).withContext('Campo tipo consulta deve ser "DetalhesProcesso"').toBe('DetalhesProcesso');

    tipoConsultaInput?.setValue(TipoConsulta.ExportacaoPesquisa);
    expect(tipoConsultaInput!.value).withContext('Campo tipo consulta deve ser "ExportacaoPesquisa"').toBe('ExportacaoPesquisa');
  });

  it('[CIT-5985] deve validar o campo situacao consulta', () => {
    const situacaoConsultaInput = component.formConsulta.get('situacaoConsulta');
    expect(situacaoConsultaInput!.value).withContext('Campo situacao consulta deve inicializar vazio').toBe('');

    situacaoConsultaInput?.setValue(null);
    expect(situacaoConsultaInput!.value).withContext('Campo situacao consulta deve ser nulo').toBeNull();

    situacaoConsultaInput?.setValue(SituacaoConsulta.Sucesso);
    expect(situacaoConsultaInput!.value).withContext('Campo situacao consulta deve ser "Sucesso"').toBe('Sucesso');

    situacaoConsultaInput?.setValue(SituacaoConsulta.Erro);
    expect(situacaoConsultaInput!.value).withContext('Campo situacao consulta deve ser "Erro"').toBe('Erro');
  });

  it('[CIT-5985] deve validar o campo data inicial', () => {
    const dataInicialInput = component.formConsulta.get('dataInicial');
    expect(dataInicialInput!.value).withContext('Campo data inicial deve inicializar vazio').toBe('');

    let futureDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    dataInicialInput!.setValue(futureDate);
    fixture.detectChanges();

    expect(dataInicialInput!.hasError('errorDataMax')).withContext('Campo data inicial não pode ser maior que data atual').toBeTruthy();
  });

  it('[CIT-5985] deve validar o campo data final', () => {
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

  it('[CIT-5985] deve preencher variável filters com dados do searchParameters', () => {
    let presentDate = new Date();
    let pastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    let formattedPresentDate = formatarDataPtBr(presentDate.toString());
    var formattedPastDate = formatarDataPtBr(pastDate.toString());
    let searchParameters = {
        usuarioEmail: 'email@teste.com',
        tipoConsulta: TipoConsulta.Pesquisa,
        situacaoConsulta: SituacaoConsulta.Sucesso,
        dataInicial: formattedPastDate,
        dataFinal: formattedPresentDate
    };

    expect(component.filters.length).withContext('Váriavel array filters deve inicializar vazia').toBe(0);

    component.addFilter(searchParameters);

    expect(component.filters.length).withContext('Váriavel array filters deve ter tamanho 5').toBe(5);
  });

  it('[CIT-5985] deve remover filtro selecionado da variável filters', () => {
    let searchParameters = {
        usuarioEmail: 'email@teste.com',
        tipoConsulta: TipoConsulta.Pesquisa,
        situacaoConsulta: SituacaoConsulta.Sucesso,
        dataInicial: null,
        dataFinal: formatarDataPtBr(new Date().toString())
    };
    let selecttedFilter = {
        key: 'tipoConsulta',
        name: 'Pesquisa'
    };

    component.addFilter(searchParameters);

    expect(component.filters.length).withContext('Váriavel array filters deve ter tamanho 4').toBe(4);

    component.removeFilter(selecttedFilter);

    let isFilterRemoved = !component.filters.includes(selecttedFilter);

    expect(component.filters.length).withContext('Váriavel array filters deve ter tamanho 3').toBe(3);
    expect(isFilterRemoved).withContext('Deve ter sido removido o filtro correto').toBeTruthy();
  });

  it('[CIT-5985] deve realizar consulta de historicos', () => {
    let presentDate = new Date();
    let pastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    const usuarioEmailInput = component.formConsulta.get('usuarioEmail');
    const tipoConsultaInput = component.formConsulta.get('tipoConsulta');
    const situacaoConsultaInput = component.formConsulta.get('situacaoConsulta');
    const dataInicialInput = component.formConsulta.get('dataInicial');
    const dataFinalInput = component.formConsulta.get('dataFinal');

    usuarioEmailInput!.setValue('email@teste.com');
    tipoConsultaInput!.setValue(TipoConsulta.Pesquisa);
    situacaoConsultaInput!.setValue(SituacaoConsulta.Sucesso);
    dataInicialInput!.setValue(pastDate);
    dataFinalInput!.setValue(presentDate);
    fixture.detectChanges();

    historicoConsultasService.getAnaliticoBy.and.returnValue(of(mockHistoricoConsultasAnaliticoResponse));
    component.search();
    expect(historicoConsultasService.getAnaliticoBy).withContext('Serviço de consulta deve ser chamado uma vez').toHaveBeenCalledTimes(1);
  });

  it('[CIT-5985] deve retornar erro caso consulta de historicos falhar', () => {
    let presentDate = new Date();
    let pastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    const usuarioEmailInput = component.formConsulta.get('usuarioEmail');
    const tipoConsultaInput = component.formConsulta.get('tipoConsulta');
    const situacaoConsultaInput = component.formConsulta.get('situacaoConsulta');
    const dataInicialInput = component.formConsulta.get('dataInicial');
    const dataFinalInput = component.formConsulta.get('dataFinal');

    usuarioEmailInput!.setValue('email@teste.com');
    tipoConsultaInput!.setValue(TipoConsulta.Pesquisa);
    situacaoConsultaInput!.setValue(SituacaoConsulta.Sucesso);
    dataInicialInput!.setValue(pastDate);
    dataFinalInput!.setValue(presentDate);
    fixture.detectChanges();

    historicoConsultasService.getAnaliticoBy.and.returnValue(throwError(() => new Error()));
    component.search();
    expect(messageTrackerService.subscribeError).withContext('Deve abrir o messageTracker ao gerar erro na consulta de historicos').toHaveBeenCalledTimes(1);
  });

  it('[CIT-5985] deve realizar exportação dos historicos pesquisados', () => {
    component.searchParameters = {
      usuarioEmail: 'email@teste.com',
      tipoConsulta: TipoConsulta.Pesquisa,
      situacaoConsulta: SituacaoConsulta.Sucesso,
      dataInicial: null,
      dataFinal: formatarDataPtBr(new Date().toString())
    };

    const fakeResponse = new Blob([''], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    spyOn(component['_dialog'], 'open').and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<typeof component>);
    exportarHistoricoConsultasService.exportAnalitico.and.returnValue(of(fakeResponse));
    spyOn(component.downloadAnchor, 'click');
    component.export();
    expect(exportarHistoricoConsultasService.exportAnalitico).withContext('Deve chamar serviço de exportação após confirmação do usuário').toHaveBeenCalled();
  });

  it('[CIT-5985] deve retornar erro caso exportação dos historicos pesquisados falhar', () => {
    spyOn(component['_dialog'], 'open').and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<typeof component>);
    exportarHistoricoConsultasService.exportAnalitico.and.returnValue(throwError(() => new Error()));
    component.export();
    expect(exportarHistoricoConsultasService.exportAnalitico).withContext('Deve chamar serviço de exportação após confirmação do usuário').toHaveBeenCalled();
    expect(messageTrackerService.subscribeError).withContext('Deve abrir o messageTracker ao gerar erro na exportação dos historicos').toHaveBeenCalled();
  });
});