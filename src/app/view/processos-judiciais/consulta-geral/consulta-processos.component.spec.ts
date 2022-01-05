import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { ConsultaProcessosComponent } from './consulta-processos.component';
import { ConsultaProcessosModule } from './consulta-processos.module';
import { ConsultaProcessosService } from 'src/app/core/services/consulta-processos/consulta-processos.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { mockConsultaProcessosResponse } from 'src/app/core/mocks/data/consulta-processos-mock';

describe('ConsultaProcessosComponent', () => {
  let component: ConsultaProcessosComponent;
  let fixture: ComponentFixture<ConsultaProcessosComponent>;
  let consultaProcessosService: any;
  let messageTrackerService: any;

  beforeEach(waitForAsync(() => {
    const consultaProcessosServiceSpy = jasmine.createSpyObj('ConsultaProcessosService', ['get']);
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
        { provide: MessageTrackerService, useValue: messageTrackerServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ConsultaProcessosComponent);
        component = fixture.componentInstance;
        consultaProcessosService = TestBed.inject(ConsultaProcessosService);
        messageTrackerService = TestBed.inject(MessageTrackerService);
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

  it('[CIT-5736] deve realizar consulta de processos', () => {
    const razaoSocialInput = component.formConsulta.get('razaoSocial');
    razaoSocialInput!.setValue('teste');
    fixture.detectChanges();
    consultaProcessosService.get.and.returnValue(of(mockConsultaProcessosResponse));
    component.search();
    expect(consultaProcessosService.get).withContext('Serviço de consulta deve ser chamado uma vez').toHaveBeenCalledTimes(1);
  });

  it('[CIT-5736] deve retornar erro caso consulta de processos falhar', () => {
    const razaoSocialInput = component.formConsulta.get('razaoSocial');
    razaoSocialInput!.setValue('teste');
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

  it('[CIT-5736] deve limpar campo razão social após limpar filtro', () => {
    const razaoSocialInput = component.formConsulta.get('razaoSocial');
    razaoSocialInput!.setValue('teste');
    fixture.detectChanges();
    component.cleanFilter();
    expect(razaoSocialInput!.value).withContext('Campo razão social deve ser nulo após limpar filtro').toBeNull();
  });
});
