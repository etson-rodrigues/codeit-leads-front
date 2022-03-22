import { NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { routes } from 'src/app/app-routing.module';
import { mockConsultaUsuarioAcaoSegurancaCadastro, mockConsultaUsuarioAcaoSegurancaProcesso, mockConsultaUsuarioPaginateResponse } from 'src/app/core/mocks/data/cadastro-usuario-mock';
import { CadastroUsuariosService } from 'src/app/core/services/cadastro-usuarios/cadastro-usuarios.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { CadastrosGuard } from './cadastros.guard';

describe('CadastrosGuard', () => {
    let guard: CadastrosGuard;
    let cadastroUsuariosService: jasmine.SpyObj<CadastroUsuariosService>;
    let localStorageService: jasmine.SpyObj<LocalStorageService>;
    let messageTrackerService: MessageTrackerService;

    beforeEach(() => {
        const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['getItemLocalStorage']);
        const cadastroUsuariosServiceSpy = jasmine.createSpyObj('CadastroUsuariosService', ['get']);
        const messageTrackerServiceSpy = jasmine.createSpyObj('MessageTrackerService', ['subscribeError']);

        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes)],
            providers: [
                { provide: LocalStorageService, useValue: localStorageServiceSpy },
                { provide: CadastroUsuariosService, useValue: cadastroUsuariosServiceSpy },
                { provide: MessageTrackerService, useValue: messageTrackerServiceSpy }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
        guard = TestBed.inject(CadastrosGuard);
        cadastroUsuariosService = TestBed.inject(CadastroUsuariosService) as jasmine.SpyObj<CadastroUsuariosService>;
        localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
        messageTrackerService = TestBed.inject(MessageTrackerService);
    });

    it('[CIT-5819] deve ser criado', () => {
        expect(guard).toBeTruthy();
    });
});
