import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoConsultasAnaliticoComponent } from './historico-consultas-analitico.component';

describe('HistoricoConsultasAnaliticoComponent', () => {
  let component: HistoricoConsultasAnaliticoComponent;
  let fixture: ComponentFixture<HistoricoConsultasAnaliticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoConsultasAnaliticoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoConsultasAnaliticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('[CIT-5979] deve criar', () => {
    expect(component).toBeTruthy();
  });
});
