import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { mockUserRedefinirSenhaResponse } from '../../mocks/data/redefinir-senha-mock';
import { RedefinirSenhaService } from './redefinir-senha.service';

describe('RedefinirSenhaService', () => {
    let service: RedefinirSenhaService;
    let http: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(RedefinirSenhaService);
        http = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        http.verify();
    });

    it('[CIT-5839] deve ser criado', () => {
        expect(service).toBeTruthy();
    });

    it('[CIT-5839] deve realizar redefinição de senha', () => {
        const id: number = 1;
        const novaSenha: string = '123123123';
        service.redefinePassword(id, novaSenha).subscribe((response) => {
            expect(response.data.id).withContext('ID deve ser 1').toBe(1);
            expect(response.data.ativo).withContext('Status deve ser ativo').toBeTruthy();
            expect(response.data.redefinirSenha).withContext('RedefinirSenha deve ser false').toBeFalsy();
        });

        const req = http.expectOne(`${service['_url']}usuarios/${id}/redefinir-senha`);

        expect(req.request.method).withContext('Método da requisição deve ser PUT').toEqual('PUT');

        req.flush(mockUserRedefinirSenhaResponse);
    });

    it('[CIT-5839] deve gerar erro se redefinição de senha falhar', () => {
        const id: number = 1;
        const novaSenha: string = '123123123';
        service.redefinePassword(id, novaSenha).subscribe({
            next: () => {
                fail('Operação de redefinir senha do usuário deveria ter falhado');
            },
            error: (error: HttpErrorResponse) => {
                expect(error.status).withContext('Status deve ser 500').toBe(500);
            }
        });

        const req = http.expectOne(`${service['_url']}usuarios/${id}/redefinir-senha`);
        expect(req.request.method).withContext('Método da requisição deve ser PUT').toEqual('PUT');

        req.flush('Redefinição de senha falhou', {
            status: 500,
            statusText: 'Internal Server Error'
        });
    });
});
