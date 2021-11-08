import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { MatSnackBarModule, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { mockError, mockError1, mockError2 } from 'src/app/core/mocks/data/error-mock';
import { MessageTrackerComponent } from './message-tracker.component';

describe('MessageTrackerComponent', () => {
  let component: MessageTrackerComponent;
  let fixture: ComponentFixture<MessageTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageTrackerComponent],
      imports: [MatSnackBarModule,],
      providers: [
        { provide: MatSnackBarRef, useValue: {} },
        { provide: MAT_SNACK_BAR_DATA, useValue: { error: mockError, progress: 'asc' } },
        { provide: MatSnackBarRef, useValue: { dismiss: () => { } } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.error = undefined;
  });

  it('[CIT-5596] deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('[CIT-5596] deve iniciar o componente com a variável error com valor undefined', fakeAsync(() => {
    expect(component.error).toBeUndefined();
  }));

  it('[CIT-5596] deve exibir o modal de erro default por determinado tempo', fakeAsync(() => {
    component.error = mockError;
    fixture.detectChanges();
    component.showMessage('default');

    expect(component.error).toBeDefined();

    fixture.detectChanges();
    flush();
  }));

  it('[CIT-5596] deve exibir o modal de erro ascendente por determinado tempo', fakeAsync(() => {
    component.error = mockError;
    fixture.detectChanges();
    component.showMessage('asc');

    expect(component.error).toBeDefined();

    fixture.detectChanges();
    flush();

  }));

  it('[CIT-5596] deve exibir o modal de erro descendente por determinado tempo', fakeAsync(() => {
    component.error = mockError;
    fixture.detectChanges();
    component.showMessage('desc');

    expect(component.error).toBeDefined();

    fixture.detectChanges();
    flush();
  }));

  it('[CIT-5596] deve limpar a variável de erros', () => {
    component.error = mockError;
    expect(component.error).toBeDefined();

    component.clearMessages();

    expect(component.error).toBeUndefined();
  });

  it('[CIT-5596] deve remover uma mensagem especifica', () => {
    component.error = mockError1;
    expect(component.error).toBeDefined();

    const error: string = 'Campo obrigatório';
    component.deleteError(error);

    expect(component.error.errors['ValidationsErrors']).toEqual([]);
  });

  it('[CIT-5596] deve verificar se existe e variável erro, se sim retorna true', () => {
    component.error = mockError2;
    fixture.detectChanges();
    expect(component.error).toBeDefined();

    expect(component.existError()).toBeTruthy();
  });

  it('[CIT-5596] deve verificar se existe e variável erro, se não retorna false', () => {
    expect(component.error).toBeUndefined();
    expect(component.existError()).toBeFalsy();
  });

  it('[CIT-5596] deve interceptar o erro e exibi-lo', fakeAsync(() => {
    component.intercept(mockError, 'default');

    fixture.detectChanges();
    flush();

    expect(component.existError()).toBeTruthy();
  }));

  it('[CIT-5596] deve retornar o id do erro formatado', () => {
    expect(component.defineIdError(0)).toEqual('errorId0');
  });
});
