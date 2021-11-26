import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConsultaProcessosComponent } from './consulta-processos.component';

describe('ConsultaProcessosComponent', () => {
  let component: ConsultaProcessosComponent;
  let fixture: ComponentFixture<ConsultaProcessosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConsultaProcessosComponent
      ],
      imports: [],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ConsultaProcessosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('[CIT-5680] deve criar', () => {
    expect(component).toBeTruthy();
  });
});
