import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ProcessosModule } from './processos.module';
import { ProcessosComponent } from './processos.component';
import { ConsultaProcessosService } from 'src/app/core/services/consulta-processos/consulta-processos.service';
import { DetalhesProcessoService } from 'src/app/core/services/detalhes-processo/detalhes-processo.service';
import { ExportarProcessosService } from 'src/app/core/services/exportar-processos/exportar-processos.service';
import { StepperService } from 'src/app/core/services/stepper/stepper.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { mockDetalhesProcessoResponseData } from 'src/app/core/mocks/data/detalhes-processo-mock';

describe('ProcessosComponent', () => {
  let component: ProcessosComponent;
  let fixture: ComponentFixture<ProcessosComponent>;
  let consultaProcessosService: jasmine.SpyObj<ConsultaProcessosService>;
  let consultaProcessoDetalheService: jasmine.SpyObj<DetalhesProcessoService>;
  let exportarConsultaProcessosService: jasmine.SpyObj<ExportarProcessosService>;
  let stepperService: jasmine.SpyObj<StepperService>;
  let messageTrackerService: jasmine.SpyObj<MessageTrackerService>;

  beforeEach(waitForAsync(() => {
    const consultaProcessosServiceSpy = jasmine.createSpyObj('ConsultaProcessosService', ['get']);
    const consultaProcessoDetalheServiceSpy = jasmine.createSpyObj('ConsultaProcessoDetalheService', ['get']);
    const exportarConsultaProcessosServiceSpy = jasmine.createSpyObj('ExportarConsultaProcessosService', ['export']);
    const stepperServiceSpy = jasmine.createSpyObj('StepperService', ['stepper']);
    const messageTrackerServiceSpy = jasmine.createSpyObj('MessageTrackerService', ['subscribeError']);

    TestBed.configureTestingModule({
      declarations: [
        ProcessosComponent
      ],
      imports: [
        ProcessosModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ConsultaProcessosService, useValue: consultaProcessosServiceSpy },
        { provide: DetalhesProcessoService, useValue: consultaProcessoDetalheServiceSpy },
        { provide: ExportarProcessosService, useValue: exportarConsultaProcessosServiceSpy },
        { provide: StepperService, useValue: stepperServiceSpy },
        { provide: MessageTrackerService, useValue: messageTrackerServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ProcessosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('[CIT-5680] deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('[CIT-5872] deve preencher variável "detalheProcesso" com valor recebido', () => {
    expect(component.detalhesProcesso).toBeUndefined();
    component.passingData(mockDetalhesProcessoResponseData);
    expect(component.detalhesProcesso).toEqual(mockDetalhesProcessoResponseData);
  });
});
