import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { mockCadastroUsuarioResponse } from 'src/app/core/mocks/data/cadastro-usuario-mock';
import { mockPerfisListResponse } from 'src/app/core/mocks/data/perfis-mock';
import { CadastroUsuariosService } from 'src/app/core/services/cadastro-usuarios/cadastro-usuarios.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { PerfisService } from 'src/app/core/services/perfis/perfis.service';
import { GerenciamentoUsuariosModule } from '../../gerenciamento-usuarios.module';
import { CadastroComponent } from './cadastro.component';

describe('CadastroComponent', () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;
  let cadastroUsuariosService: any;
  let perfisService: any;
  let messageTrackerService: any;

  beforeEach(waitForAsync(() => {
    const cadastroUsuariosServiceSpy = jasmine.createSpyObj('CadastroUsuariosService', ['save']);
    const messageTrackerServiceSpy = jasmine.createSpyObj('MessageTrackerService', ['subscribeError']);

    TestBed.configureTestingModule({
      declarations: [
        CadastroComponent
      ],
      imports: [
        GerenciamentoUsuariosModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: CadastroUsuariosService, useValue: cadastroUsuariosServiceSpy },
        { provide: MessageTrackerService, useValue: messageTrackerServiceSpy },
        {
          provide: PerfisService, useValue: {
            getPerfis() {
              return of(mockPerfisListResponse);
            }
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CadastroComponent);
        cadastroUsuariosService = TestBed.inject(CadastroUsuariosService);
        perfisService = TestBed.inject(PerfisService);
        messageTrackerService = TestBed.inject(MessageTrackerService);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('[CIT-5693] deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('[CIT-5693] deve validar formulário vazio', () => {
    expect(component.formCadastro.valid).withContext('Formulário deve inicializar inválido').toBeFalsy();
  });

  it('[CIT-5693] deve validar campo de e-mail', () => {
    const emailInput = component.formCadastro.get('email');
    fixture.detectChanges();
    expect(emailInput!.valid).withContext('Campo e-mail deve inicializar inválido').toBeFalsy();

    emailInput!.setValue('');
    fixture.detectChanges();
    expect(emailInput!.hasError('required')).withContext('Campo e-mail é obrigatório').toBeTruthy();

    emailInput!.setValue('teste');
    fixture.detectChanges();
    expect(emailInput!.hasError('errorEmail')).withContext('Campo e-mail deve estar no padrão @email.com').toBeTruthy();

    emailInput!.setValue('testeemailmaiorquecinquentacaracteres@emaildeteste.com');
    fixture.detectChanges();
    expect(emailInput!.hasError('maxlength')).withContext('Campo e-mail deve ter menos que 50 caracteres').toBeTruthy();

    emailInput!.setValue('teste@email.com');
    fixture.detectChanges();
    expect(emailInput!.valid).withContext('Campo e-mail deve ser válido').toBeTruthy();
  });

  it('[CIT-5693] deve validar campo de senha', () => {
    const senhaInput = component.formCadastro.get('senha');
    fixture.detectChanges();
    expect(senhaInput!.valid).withContext('Campo senha deve inicializar inválido').toBeFalsy();

    senhaInput!.setValue('');
    fixture.detectChanges();
    expect(senhaInput!.hasError('required')).withContext('Campo senha é obrigatório').toBeTruthy();

    senhaInput!.setValue('REj%oZs');
    fixture.detectChanges();
    expect(senhaInput!.hasError('minlength')).withContext('Campo senha deve ter mais que 8 caracteres').toBeTruthy();

    senhaInput!.setValue('^R+smUE8_*SbTgFye?B4=Y6%HSautF9^K@tw26!@Lh&+Nqj_#sgC?GsCPk_X6tmUwrFRN=RK#^x=Q!D=uDc!=KuEx8$wJpXAVFBsg');
    fixture.detectChanges();
    expect(senhaInput!.hasError('maxlength')).withContext('Campo senha deve ter menos que 100 caracteres').toBeTruthy();

    senhaInput!.setValue('senhateste');
    fixture.detectChanges();
    expect(senhaInput!.valid).withContext('Campo senha deve ser válido').toBeTruthy();
  });

  it('[CIT-5693] deve validar campo de confirmar senha', () => {
    const senhaInput = component.formCadastro.get('senha');
    const confirmarSenhaInput = component.formCadastro.get('confirmarSenha');

    fixture.detectChanges();
    expect(confirmarSenhaInput!.valid).withContext('Campo senha deve inicializar inválido').toBeFalsy();

    confirmarSenhaInput!.setValue('');
    fixture.detectChanges();
    expect(confirmarSenhaInput!.hasError('required')).withContext('Campo senha é obrigatório').toBeTruthy();

    confirmarSenhaInput!.setValue('REj%oZs');
    fixture.detectChanges();
    expect(confirmarSenhaInput!.hasError('minlength')).withContext('Campo senha deve ter mais que 8 caracteres').toBeTruthy();

    confirmarSenhaInput!.setValue('^R+smUE8_*SbTgFye?B4=Y6%HSautF9^K@tw26!@Lh&+Nqj_#sgC?GsCPk_X6tmUwrFRN=RK#^x=Q!D=uDc!=KuEx8$wJpXAVFBsg');
    fixture.detectChanges();
    expect(confirmarSenhaInput!.hasError('maxlength')).withContext('Campo senha deve ter menos que 100 caracteres').toBeTruthy();

    senhaInput!.setValue('senha1234');
    confirmarSenhaInput!.setValue('senha4321');
    fixture.detectChanges();
    expect(confirmarSenhaInput!.hasError('devemSerSenhasIguais')).withContext('Campo confirmar senha deve ser igual ao campo senha').toBeTruthy();

    confirmarSenhaInput!.setValue('senha1234');
    fixture.detectChanges();
    expect(confirmarSenhaInput!.valid).withContext('Campo senha deve ser válido').toBeTruthy();
  });

  it('[CIT-5693] deve validar campo de perfil', () => {
    const perfilInput = component.formCadastro.get('perfil');
    fixture.detectChanges();
    expect(perfilInput!.valid).withContext('Campo perfil deve inicializar inválido').toBeFalsy();

    const debugElement = fixture.debugElement;
    const matSelect = debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    matSelect.click();
    fixture.detectChanges();
    const matOption = debugElement.query(By.css('.mat-option')).nativeElement;
    matOption.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(perfilInput!.value.descricao).withContext('Campo perfil deve estar preenchido com Administrador').toBe('Administrador');
    });
  });

  it('[CIT-5693] deve cadastrar novo usuário', fakeAsync(() => {
    spyOn(component['_resumoService'], 'setValues');

    const emailInput = component.formCadastro.get('email');
    const senhaInput = component.formCadastro.get('senha');
    const confirmarSenhaInput = component.formCadastro.get('confirmarSenha');
    const perfilInput = component.formCadastro.get('perfil');

    emailInput!.setValue('teste@email.com');
    senhaInput!.setValue('senha12345');
    confirmarSenhaInput!.setValue('senha12345');
    perfilInput!.setValue({ codigo: '002', descricao: 'Operador' });

    cadastroUsuariosService.save.and.returnValue(of(mockCadastroUsuarioResponse));

    component.register();

    flush();

    expect(component['_resumoService'].setValues).withContext('Deve chamar função de envio dos dados do usuário ao cadastrar com sucesso').toHaveBeenCalledTimes(1);
  }));

  it('[CIT-5693] deve gerar erro ao cadastrar usuário já existente', fakeAsync(() => {
    spyOn(component['_resumoService'], 'setValues');

    const emailInput = component.formCadastro.get('email');
    const senhaInput = component.formCadastro.get('senha');
    const confirmarSenhaInput = component.formCadastro.get('confirmarSenha');
    const perfilInput = component.formCadastro.get('perfil');

    emailInput!.setValue('teste@email.com');
    senhaInput!.setValue('senha12345');
    confirmarSenhaInput!.setValue('senha12345');
    perfilInput!.setValue({ codigo: '002', descricao: 'Operador' });

    cadastroUsuariosService.save.and.returnValue(throwError(() => new Error()));

    component.register();

    flush();

    expect(component['_resumoService'].setValues).withContext('Não deve chamar função de envio dos dados do usuário ao gerar erro ao cadastrar usuário').toHaveBeenCalledTimes(0);
    expect(messageTrackerService.subscribeError).withContext('Deve abrir o messageTracker ao gerar erro ao cadastrar usuário').toHaveBeenCalledTimes(1);
  }));
});
