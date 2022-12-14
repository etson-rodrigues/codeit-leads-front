import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
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

    beforeEach(
        waitForAsync(() => {
            const cadastroUsuariosServiceSpy = jasmine.createSpyObj('CadastroUsuariosService', ['save']);
            const messageTrackerServiceSpy = jasmine.createSpyObj('MessageTrackerService', ['subscribeError']);

            TestBed.configureTestingModule({
                declarations: [CadastroComponent],
                imports: [GerenciamentoUsuariosModule, RouterTestingModule, NoopAnimationsModule],
                providers: [
                    { provide: CadastroUsuariosService, useValue: cadastroUsuariosServiceSpy },
                    { provide: MessageTrackerService, useValue: messageTrackerServiceSpy },
                    {
                        provide: PerfisService,
                        useValue: {
                            getPerfis() {
                                return of(mockPerfisListResponse);
                            }
                        }
                    }
                ],
                schemas: [NO_ERRORS_SCHEMA]
            })
                .compileComponents()
                .then(() => {
                    fixture = TestBed.createComponent(CadastroComponent);
                    cadastroUsuariosService = TestBed.inject(CadastroUsuariosService);
                    perfisService = TestBed.inject(PerfisService);
                    messageTrackerService = TestBed.inject(MessageTrackerService);
                    component = fixture.componentInstance;
                    fixture.detectChanges();
                });
        })
    );

    it('[CIT-5693] deve criar', () => {
        expect(component).toBeTruthy();
    });

    it('[CIT-5693] deve validar formul??rio vazio', () => {
        expect(component.formCadastro.valid).withContext('Formul??rio deve inicializar inv??lido').toBeFalsy();
    });

    it('[CIT-5693] deve validar campo de e-mail', () => {
        const emailInput = component.formCadastro.get('email');
        fixture.detectChanges();
        expect(emailInput!.valid).withContext('Campo e-mail deve inicializar inv??lido').toBeFalsy();

        emailInput!.setValue('');
        fixture.detectChanges();
        expect(emailInput!.hasError('required')).withContext('Campo e-mail ?? obrigat??rio').toBeTruthy();

        emailInput!.setValue('teste');
        fixture.detectChanges();
        expect(emailInput!.hasError('errorEmail')).withContext('Campo e-mail deve estar no padr??o @email.com').toBeTruthy();

        emailInput!.setValue('testeemailmaiorquecinquentacaracteres@emaildeteste.com');
        fixture.detectChanges();
        expect(emailInput!.hasError('maxlength')).withContext('Campo e-mail deve ter menos que 50 caracteres').toBeTruthy();

        emailInput!.setValue('teste@email.com');
        fixture.detectChanges();
        expect(emailInput!.valid).withContext('Campo e-mail deve ser v??lido').toBeTruthy();
    });

    it('[CIT-5693] deve validar campo de senha', () => {
        const senhaInput = component.formCadastro.get('senha');
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

    it('[CIT-5693] deve validar campo de confirmar senha', () => {
        const senhaInput = component.formCadastro.get('senha');
        const confirmarSenhaInput = component.formCadastro.get('confirmarSenha');

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

    it('[CIT-5693] deve validar campo de perfil', () => {
        const perfilInput = component.formCadastro.get('perfil');
        fixture.detectChanges();
        expect(perfilInput!.valid).withContext('Campo perfil deve inicializar inv??lido').toBeFalsy();

        perfilInput!.setValue({ codigo: '001', descricao: 'Administrador' });
        fixture.detectChanges();
        expect(perfilInput!.value.descricao).withContext('Campo perfil deve estar preenchido com Administrador').toBe('Administrador');
    });

    it('[CIT-5694] deve preencher os dados do formul??rio caso for edi????o de usu??rio', () => {
        const data = {
            id: 1,
            email: 'teste@email.com',
            perfil: {
                codigo: '001',
                descricao: 'Administrador'
            }
        };
        component['_editarService'].setValues(data);
        component.fillFormEditing();
        expect(component.formCadastro.controls.email.value).withContext('Campo e-mail deve ser preenchido').toEqual('teste@email.com');
        expect(component.formCadastro.controls.perfil.value).withContext('Campo perfil deve ser preenchido').toEqual('001');
    });

    it('[CIT-5694] deve limpar campos do formul??rio', () => {
        const emailInput = component.formCadastro.controls.email;
        emailInput!.setValue('teste@email.com');
        fixture.detectChanges();
        component.resetForm();
        expect(emailInput!.value).withContext('Campo e-mail deve ser nulo ap??s resetar o formul??rio').toBeNull();
    });

    it('[CIT-5694] deve limpar campos do formul??rio caso usu??rio cancelar o novo cadastro', () => {
        spyOn(component.isFinished, 'emit');
        const emailInput = component.formCadastro.controls.email;
        emailInput!.setValue('teste@email.com');
        fixture.detectChanges();
        component.cancelar();
        expect(emailInput!.value).withContext('Campo e-mail deve ser nulo ap??s resetar o formul??rio').toBeNull();
        expect(component.isFinished.emit).withContext('Deve emitir evento de previousStep').toHaveBeenCalledTimes(1);
    });

    it('[CIT-5794] deve chamar fun????o de foco e armazenar refs dos campos dos fomul??rios nas vari??veis', () => {
        fixture.detectChanges();
        expect(component.listRef.length).withContext('Vari??vel listRef deve inicializar um array vazio').toEqual(0);
        component.changeFocus();
        expect(component.listRef.length).withContext('Vari??vel listRef deve receber um array com 4 refs').toEqual(4);
    });
});
