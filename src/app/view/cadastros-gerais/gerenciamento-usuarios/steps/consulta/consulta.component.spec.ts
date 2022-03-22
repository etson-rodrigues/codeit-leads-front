import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { mockConsultaCadastroEdicao, mockConsultaUsuarioPaginateResponse } from 'src/app/core/mocks/data/cadastro-usuario-mock';
import { CadastroUsuariosService } from 'src/app/core/services/cadastro-usuarios/cadastro-usuarios.service';
import { EditarService } from 'src/app/core/services/editar/editar.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { GerenciamentoUsuariosModule } from '../../gerenciamento-usuarios.module';
import { ConsultaComponent } from './consulta.component';
import { ResumoService } from 'src/app/core/services/resumo/resumo.service';

describe('ConsultaComponent', () => {
    let component: ConsultaComponent;
    let fixture: ComponentFixture<ConsultaComponent>;
    let cadastroUsuariosService: any;
    let messageTrackerService: any;
    let editarService: any;
    let resumoService: any;

    beforeEach(
        waitForAsync(() => {
            const cadastroUsuariosServiceSpy = jasmine.createSpyObj('CadastroUsuariosService', ['save', 'updateStatus', 'get']);
            const editarServiceSpy = jasmine.createSpyObj('EditarService', ['setValues']);
            const resumoServiceSpy = jasmine.createSpyObj('ResumoService', ['setValues']);
            const messageTrackerServiceSpy = jasmine.createSpyObj('MessageTrackerService', ['subscribeError']);

            TestBed.configureTestingModule({
                declarations: [ConsultaComponent],
                imports: [GerenciamentoUsuariosModule, RouterTestingModule, NoopAnimationsModule],
                providers: [
                    { provide: CadastroUsuariosService, useValue: cadastroUsuariosServiceSpy },
                    { provide: EditarService, useValue: editarServiceSpy },
                    { provide: ResumoService, useValue: resumoServiceSpy },
                    { provide: MessageTrackerService, useValue: messageTrackerServiceSpy }
                ],
                schemas: [NO_ERRORS_SCHEMA]
            })
                .compileComponents()
                .then(() => {
                    fixture = TestBed.createComponent(ConsultaComponent);
                    cadastroUsuariosService = TestBed.inject(CadastroUsuariosService);
                    editarService = TestBed.inject(EditarService);
                    resumoService = TestBed.inject(ResumoService);
                    messageTrackerService = TestBed.inject(MessageTrackerService);
                    component = fixture.componentInstance;
                    fixture.detectChanges();
                });
        })
    );

    it('[CIT-5693] deve criar', () => {
        expect(component).toBeTruthy();
    });

    it('[CIT-5694] deve validar formulário vazio', () => {
        expect(component.formConsulta.controls.email.value).withContext('Formulário deve inicializar vazio').toEqual('');
    });

    it('[CIT-5694] deve realizar consulta de usuários', () => {
        const emailInput = component.formConsulta.get('email');
        emailInput!.setValue('teste');
        fixture.detectChanges();
        cadastroUsuariosService.get.and.returnValue(of(mockConsultaUsuarioPaginateResponse));
        component.search();
        expect(cadastroUsuariosService.get).withContext('Serviço de consulta deve ser chamado uma vez').toHaveBeenCalledTimes(1);
    });

    it('[CIT-5694] deve retornar erro caso consulta de processos falhar', () => {
        const emailInput = component.formConsulta.get('email');
        emailInput!.setValue('teste');
        fixture.detectChanges();
        cadastroUsuariosService.get.and.returnValue(throwError(() => new Error()));
        component.search();
        expect(messageTrackerService.subscribeError).withContext('Deve abrir o messageTracker ao gerar erro na consulta de usuários').toHaveBeenCalledTimes(1);
    });

    it('[CIT-5694] deve realizar requisição de troca de página da consulta de usuários', () => {
        const event = {
            length: 10,
            pageIndex: 1,
            pageSize: 3,
            previousPageIndex: 0
        };
        const emailInput = component.formConsulta.get('email');
        emailInput!.setValue('teste');
        fixture.detectChanges();
        cadastroUsuariosService.get.and.returnValue(of(mockConsultaUsuarioPaginateResponse));
        component.onPageChange(event);
        expect(cadastroUsuariosService.get).withContext('Serviço de consulta deve ser chamado uma vez').toHaveBeenCalledTimes(1);
    });

    it('[CIT-5694] deve retornar erro caso requisição de troca de página da consulta de usuários falhar', () => {
        const event = {
            length: 10,
            pageIndex: 1,
            pageSize: 3,
            previousPageIndex: 0
        };
        const emailInput = component.formConsulta.get('email');
        emailInput!.setValue('teste');
        fixture.detectChanges();
        cadastroUsuariosService.get.and.returnValue(throwError(() => new Error()));
        component.onPageChange(event);
        expect(messageTrackerService.subscribeError).withContext('Deve abrir o messageTracker ao gerar erro na consulta de processos').toHaveBeenCalledTimes(1);
    });

    it('[CIT-5694] deve limpar campo e-mail após limpar filtro', () => {
        const emailInput = component.formConsulta.get('email');
        emailInput!.setValue('teste');
        fixture.detectChanges();
        component.cleanFilter();
        expect(emailInput!.value).withContext('Campo e-mail deve ser vazio após limpar filtro').toEqual('');
    });

    it('[CIT-5694] deve chamar serviço de edição ao selecionar usuário para editar', () => {
        component.edit(mockConsultaCadastroEdicao);
        expect(editarService.setValues).withContext('Serviço de editar deve ser chamado').toHaveBeenCalledTimes(1);
    });
});
