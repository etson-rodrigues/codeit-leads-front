import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { GerenciamentoUsuariosComponent } from './gerenciamento-usuarios.component';

describe('GerenciamentoUsuariosComponent', () => {
  let component: GerenciamentoUsuariosComponent;
  let fixture: ComponentFixture<GerenciamentoUsuariosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        GerenciamentoUsuariosComponent
      ],
      imports: [],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(GerenciamentoUsuariosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('[CIT-5682] deve criar', () => {
    expect(component).toBeTruthy();
  });
});
