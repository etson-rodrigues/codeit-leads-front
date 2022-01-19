import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { routes } from 'src/app/app-routing.module';
import { mockLoginResponse } from 'src/app/core/mocks/data/autenticacao-mock';
import { AutenticacaoService } from 'src/app/core/services/autenticacao/autenticacao.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { ConsultaProcessosModule } from '../processos-judiciais/consulta-geral/consulta-processos.module';
import { LoginComponent } from './login.component';
import { LoginModule } from './login.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let autenticacaoService: jasmine.SpyObj<AutenticacaoService>;
  let messageTrackerService: jasmine.SpyObj<MessageTrackerService>;

  beforeEach(waitForAsync(() => {
    const autenticacaoServiceSpy = jasmine.createSpyObj('AutenticacaoService', ['login']);
    const messageTrackerServiceSpy = jasmine.createSpyObj('MessageTrackerService', ['subscribeError']);

    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        LoginModule,
        ConsultaProcessosModule,
        RouterTestingModule.withRoutes(routes),
        NoopAnimationsModule
      ],
      providers: [
        { provide: AutenticacaoService, useValue: autenticacaoServiceSpy },
        { provide: MessageTrackerService, useValue: messageTrackerServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        autenticacaoService = TestBed.inject(AutenticacaoService) as jasmine.SpyObj<AutenticacaoService>;
        messageTrackerService = TestBed.inject(MessageTrackerService) as jasmine.SpyObj<MessageTrackerService>;
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));


  it('[CIT-5680] deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('[CIT-5680] deve validar campo de e-mail', () => {
    const emailInput = component.formLogin.get('email');
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

  it('[CIT-5680] deve validar campo de senha', () => {
    const senhaInput = component.formLogin.get('senha');
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

  it('[CIT-5680] deve validar login do usuário', fakeAsync(() => {
    autenticacaoService.login.and.returnValue(of(mockLoginResponse));
    component.login();
    flush();
    expect(autenticacaoService.login).withContext('Serviço de login deve ser chamado uma vez').toHaveBeenCalledTimes(1);
    expect(messageTrackerService.subscribeError).withContext('Não deve abrir o messageTracker ao realizar o login do usuário').toHaveBeenCalledTimes(0);
  }));

  it('[CIT-5680] deve gerar erro quando falhar ao realizar login do usuário', fakeAsync(() => {
    autenticacaoService.login.and.returnValue(throwError(() => new Error()));
    component.login();
    flush();
    expect(autenticacaoService.login).withContext('Serviço de login deve ser chamado uma vez').toHaveBeenCalledTimes(1);
    expect(messageTrackerService.subscribeError).withContext('Deve abrir o messageTracker ao retornar erro do login do usuário').toHaveBeenCalledTimes(1);
  }));
});
