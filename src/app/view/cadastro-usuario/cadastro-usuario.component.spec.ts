import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CadastroUsuarioComponent } from './cadastro-usuario.component';

describe('CadastroUsuarioComponent', () => {
  let component: CadastroUsuarioComponent;
  let fixture: ComponentFixture<CadastroUsuarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CadastroUsuarioComponent
      ],
      imports: [],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CadastroUsuarioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('[CIT-5682] deve criar', () => {
    expect(component).toBeTruthy();
  });
});
