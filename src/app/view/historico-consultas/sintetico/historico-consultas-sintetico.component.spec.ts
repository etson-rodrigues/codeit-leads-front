import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoConsultasSinteticoComponent } from './historico-consultas-sintetico.component';

describe('HistoricoConsultasSinteticoComponent', () => {
  let component: HistoricoConsultasSinteticoComponent;
  let fixture: ComponentFixture<HistoricoConsultasSinteticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoConsultasSinteticoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoConsultasSinteticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('[CIT-5944] deve criar', () => {
    expect(component).toBeTruthy();
  });
});
