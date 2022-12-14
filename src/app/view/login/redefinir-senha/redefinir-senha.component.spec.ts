import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { routes } from 'src/app/app-routing.module';
import { mockLoginResponse } from 'src/app/core/mocks/data/autenticacao-mock';
import { mockCadastroUsuarioResponse } from 'src/app/core/mocks/data/cadastro-usuario-mock';
import { AutenticacaoService } from 'src/app/core/services/autenticacao/autenticacao.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { RedefinirSenhaService } from 'src/app/core/services/redefinir-senha/redefinir-senha.service';
import { RedefinirSenhaComponent } from './redefinir-senha.component';
import { RedefinirSenhaModule } from './redefinir-senha.module';

describe('RedefinirSenhaComponent', () => {
    let component: RedefinirSenhaComponent;
    let fixture: ComponentFixture<RedefinirSenhaComponent>;
    let autenticacaoService: jasmine.SpyObj<AutenticacaoService>;
    let redefinirSenhaService: jasmine.SpyObj<RedefinirSenhaService>;
    let messageTrackerService: jasmine.SpyObj<MessageTrackerService>;

    beforeEach(
        waitForAsync(() => {
            const autenticacaoServiceSpy = jasmine.createSpyObj('AutenticacaoService', ['login']);
            const redefinirSenhaServiceSpy = jasmine.createSpyObj('RedefinirSenhaService', ['redefinePassword']);
            const messageTrackerServiceSpy = jasmine.createSpyObj('MessageTrackerService', ['subscribeError']);

            TestBed.configureTestingModule({
                declarations: [RedefinirSenhaComponent],
                imports: [RedefinirSenhaModule, RouterTestingModule.withRoutes(routes), NoopAnimationsModule],
                providers: [
                    { provide: AutenticacaoService, useValue: autenticacaoServiceSpy },
                    { provide: RedefinirSenhaService, useValue: redefinirSenhaServiceSpy },
                    { provide: MessageTrackerService, useValue: messageTrackerServiceSpy }
                ],
                schemas: [NO_ERRORS_SCHEMA]
            })
                .compileComponents()
                .then(() => {
                    fixture = TestBed.createComponent(RedefinirSenhaComponent);
                    autenticacaoService = TestBed.inject(AutenticacaoService) as jasmine.SpyObj<AutenticacaoService>;
                    redefinirSenhaService = TestBed.inject(RedefinirSenhaService) as jasmine.SpyObj<RedefinirSenhaService>;
                    messageTrackerService = TestBed.inject(MessageTrackerService) as jasmine.SpyObj<MessageTrackerService>;
                    component = fixture.componentInstance;
                    fixture.detectChanges();
                });
        })
    );

    it('[CIT-5787] deve criar', () => {
        expect(component).toBeTruthy();
    });

    it('[CIT-5787] deve validar formul??rio vazio', () => {
        expect(component.formRedefinirSenha.valid).withContext('Formul??rio deve inicializar inv??lido').toBeFalsy();
    });

    it('[CIT-5787] deve validar campo de senha', () => {
        const senhaInput = component.formRedefinirSenha.get('senha');
        fixture.detectChanges();
        expect(senhaInput!.valid).withContext('Campo senha deve inicializar inv??lido').toBeFalsy();

        senhaInput!.setValue('');
        fixture.detectChanges();
        expect(senhaInput!.hasError('required')).withContext('Campo senha ?? obrigat??rio').toBeTruthy();

        senhaInput!.setValue('REj%oZs');
        fixture.detectChanges();
        expect(senhaInput!.hasError('minlength')).withContext('Campo senha deve ter mais que 8 caracteres').toBeTruthy();

        senhaInput!.setValue('^R+smUE8_*SbTgFye?B4=Y6%HSautF9^K@tw26!@Lh&+Nqj_#sgC?GsCPk_X6tmUwrFRN=RK#^x=Q!D=uDc!=KuEx8$wJpXAVFBsg');
        fixture.detectChanges();
        expect(senhaInput!.hasError('maxlength')).withContext('Campo senha deve ter menos que 100 caracteres').toBeTruthy();

        senhaInput!.setValue('senhateste');
        fixture.detectChanges();
        expect(senhaInput!.valid).withContext('Campo senha deve ser v??lido').toBeTruthy();
    });

    it('[CIT-5787] deve validar campo de confirmar senha', () => {
        const senhaInput = component.formRedefinirSenha.get('senha');
        const confirmarSenhaInput = component.formRedefinirSenha.get('confirmarSenha');

        fixture.detectChanges();
        expect(confirmarSenhaInput!.valid).withContext('Campo senha deve inicializar inv??lido').toBeFalsy();

        confirmarSenhaInput!.setValue('');
        fixture.detectChanges();
        expect(confirmarSenhaInput!.hasError('required')).withContext('Campo senha ?? obrigat??rio').toBeTruthy();

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
        expect(confirmarSenhaInput!.valid).withContext('Campo senha deve ser v??lido').toBeTruthy();
    });

    it('[CIT-5787] deve redefinir a senha do usu??rio', () => {
        spyOn(component, 'login');
        component.loginInfo = mockLoginResponse.data;
        const senhaInput = component.formRedefinirSenha.get('senha');
        const confirmarSenhaInput = component.formRedefinirSenha.get('confirmarSenha');
        senhaInput!.setValue('senha12345');
        confirmarSenhaInput!.setValue('senha12345');
        redefinirSenhaService.redefinePassword.and.returnValue(of(mockCadastroUsuarioResponse));
        component.changePassword();
        expect(component.login).withContext('Deve chamar fun????o de login ap??s redefinir a senha do usu??rio com sucesso').toHaveBeenCalledTimes(1);
    });

    it('[CIT-5787] deve gerar erro caso redefini????o de senha do usu??rio falhar', () => {
        component.loginInfo = mockLoginResponse.data;
        const senhaInput = component.formRedefinirSenha.get('senha');
        const confirmarSenhaInput = component.formRedefinirSenha.get('confirmarSenha');
        senhaInput!.setValue('senha12345');
        confirmarSenhaInput!.setValue('senha12345');
        redefinirSenhaService.redefinePassword.and.returnValue(throwError(() => new Error()));
        component.changePassword();
        expect(messageTrackerService.subscribeError).withContext('Deve abrir o messageTracker ao gerar erro ao redefinir senha do usu??rio').toHaveBeenCalledTimes(1);
    });

    it('[CIT-5787] deve validar login do usu??rio', () => {
        component.loginInfo = mockLoginResponse.data;
        const senhaInput = component.formRedefinirSenha.get('senha');
        const confirmarSenhaInput = component.formRedefinirSenha.get('confirmarSenha');
        senhaInput!.setValue('senha12345');
        confirmarSenhaInput!.setValue('senha12345');
        autenticacaoService.login.and.returnValue(of(mockLoginResponse));
        component.login();
        expect(autenticacaoService.login).withContext('Servi??o de login deve ser chamado uma vez').toHaveBeenCalledTimes(1);
        expect(messageTrackerService.subscribeError).withContext('N??o deve abrir o messageTracker ao realizar o login do usu??rio').toHaveBeenCalledTimes(0);
    });

    it('[CIT-5787] deve gerar erro quando falhar ao realizar login do usu??rio', () => {
        component.loginInfo = mockLoginResponse.data;
        const senhaInput = component.formRedefinirSenha.get('senha');
        const confirmarSenhaInput = component.formRedefinirSenha.get('confirmarSenha');
        senhaInput!.setValue('senha12345');
        confirmarSenhaInput!.setValue('senha12345');
        autenticacaoService.login.and.returnValue(throwError(() => new Error()));
        component.login();
        expect(autenticacaoService.login).withContext('Servi??o de login deve ser chamado uma vez').toHaveBeenCalledTimes(1);
        expect(messageTrackerService.subscribeError).withContext('Deve abrir o messageTracker ao retornar erro do login do usu??rio').toHaveBeenCalledTimes(1);
    });
});
