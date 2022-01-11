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

  it('[CIT-5694] deve mudar para o step resumo após atualização de status', () => {
    component.getIsUpdatedStatus(true);
    expect(component['stepper'].selectedIndex).withContext('Deve mudar para o step resumo caso atualização do status seja realizada com sucesso').toBe(2);
  });

  it('[CIT-5694] deve setar valor na variável isEditing', () => {
    component.setIsEditing(true);
    expect(component.isEditing).withContext('Valor da variável isEditing deve se true').toBeTruthy();
  });
});
