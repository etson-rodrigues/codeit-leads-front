import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ExportarProcessosService } from './exportar-processos.service';
import { CriterioData } from '../../enums/criterio-data.enum';

describe('ExportarConsultaProcessosService', () => {
    let service: ExportarProcessosService;
    let http: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(ExportarProcessosService);
        http = TestBed.inject(HttpTestingController);
    });

    it('[CIT-5881] deve ser criado', () => {
        expect(service).toBeTruthy();
    });

    it('[CIT-5881] deve retornar a exportação dos processos', () => {
        const searchParameters = {
            razaoSocialCnpj: 'teste',
            criterioData: CriterioData.CriacaoProcesso,
            dataInicial: '2021-01-01',
            dataFinal: '2022-01-01'
        };
        const fakeResponse = new Blob([''], { type: 'text/csv' });
        service.export(searchParameters).subscribe((response) => {
            expect(response instanceof Blob)
                .withContext('Retorno deve ser Blob')
                .toBeTruthy();
            expect(response.type).withContext('Tipo deve ser text/csv').toEqual('text/csv');
        });
        const req = http.expectOne(`${service['_url']}processos-judiciais/exportar`);
        expect(req.request.method).toBe('POST');
        req.flush(fakeResponse);
    });

    it('[CIT-5881] deve retornar erro caso exportação dos processos falhar', () => {
        const searchParameters = {
            razaoSocialCnpj: 'teste',
            criterioData: CriterioData.CriacaoProcesso,
            dataInicial: '2021-01-01',
            dataFinal: '2022-01-01'
        };
        const fakeResponse = new Blob([''], { type: 'application/problem+json' });
        service.export(searchParameters).subscribe({
            next: () => {
                fail('Operação de exportar processos deveria ter falhado');
            },
            error: (error) => {
                expect(error.status).withContext('Status deve ser 500').toBe(500);
                expect(error.error.type).withContext('Tipo deve ser application/problem+json').toEqual('application/problem+json');
            }
        });
        const req = http.expectOne(`${service['_url']}processos-judiciais/exportar`);
        expect(req.request.method).toBe('POST');
        req.flush(fakeResponse, {
            status: 500,
            statusText: 'Internal Server Error'
        });
    });
});
