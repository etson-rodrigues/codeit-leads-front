import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { GerenciamentoUsuariosModule } from '../../gerenciamento-usuarios.module';
import { ConsultaComponent } from './consulta.component';

describe('ConsultaComponent', () => {
  let component: ConsultaComponent;
  let fixture: ComponentFixture<ConsultaComponent>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [
        ConsultaComponent
      ],
      imports: [
        GerenciamentoUsuariosModule,
        NoopAnimationsModule
      ],
      providers: [

      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ConsultaComponent);

        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('[CIT-5693] deve criar', () => {
    expect(component).toBeTruthy();
  });
});
