import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoConsultasAnaliticoVisualizarHistoricosResultadoComponent } from './historico-consultas-analitico-visualizar-historicos-resultado.component';

describe('HistoricoConsultasAnaliticoVisualizarHistoricosResultadoComponent', () => {
  let component: HistoricoConsultasAnaliticoVisualizarHistoricosResultadoComponent;
  let fixture: ComponentFixture<HistoricoConsultasAnaliticoVisualizarHistoricosResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoConsultasAnaliticoVisualizarHistoricosResultadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoConsultasAnaliticoVisualizarHistoricosResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('[CIT-5979] deve criar', () => {
    expect(component).toBeTruthy();
  });
});
