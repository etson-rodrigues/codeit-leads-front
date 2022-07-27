import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CriterioData } from '../../enums/criterio-data.enum';
import { mockConsultaProcessosResponse } from '../../mocks/data/consulta-processos-mock';
import { ConsultaProcessosService } from './consulta-processos.service';

describe('ConsultaProcessosService', () => {
    let service: ConsultaProcessosService;
    let http: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ConsultaProcessosService]
        });
        service = TestBed.inject(ConsultaProcessosService);
        http = TestBed.inject(HttpTestingController);
    });

    it('[CIT-5736] deve ser criado', () => {
        expect(service).toBeTruthy();
    });

    it('[CIT-5736][CIT-5849] deve retornar dados dos processos', () => {
        const searchParameters = {
            razaoSocialCnpj: 'teste',
            nup: '0002900-68.2016.8.16.0035',
            valorCausa: 123.45,
            criterioData: CriterioData.CriacaoProcesso,
            dataInicial: '01/01/2021',
            dataFinal: '01/01/2022',
            tribunais: ['TST','TRT'],
            uf: 'SC'
        };
        const pageNumber = 1;
        const pageSize = 3;

        const params = {
            ...searchParameters,
            dataInicial: '2021-01-01',
            dataFinal: '2022-01-01',
            pageNumber: 1,
            pageSize: 3
        };
        let urlParams = '';
        for (const [chave, valor] of Object.entries(params)) {
            urlParams += `${chave}=${valor}&`;
        }

        service.post(searchParameters, pageNumber, pageSize).subscribe((response) => {
            expect(response.data.length).withContext('Deve retornar array com 3 elementos').toBe(3);
            expect(response.data.filter((item) => item.numeroUnicoProtocolo == '2222222-22.2222.2.22.2222'))
                .withContext('Deve possuir o NUP 2222222-22.2222.2.22.2222')
                .toBeTruthy();
        });

        const req = http.expectOne(`${service['_url']}processos-judiciais?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`);
        expect(req.request.method).toBe('POST');

        req.flush(mockConsultaProcessosResponse);
    });

    it('[CIT-5736][CIT-5849] deve retornar erro caso consulta dos processos falhar', () => {
        const searchParameters = {
            razaoSocialCnpj: 'teste',
            nup: '0002900-68.2016.8.16.0035',
            valorCausa: 123.45,
            criterioData: CriterioData.CriacaoProcesso,
            dataInicial: '01/01/2021',
            dataFinal: '01/01/2022',
            tribunais: ['TST','TRT'],
            uf: 'SC'
        };
        const pageNumber = 1;
        const pageSize = 3;

        const params = {
            ...searchParameters,
            dataInicial: '2021-01-01',
            dataFinal: '2022-01-01',
            pageNumber: 1,
            pageSize: 3
        };
        let urlParams = '';
        for (const [chave, valor] of Object.entries(params)) {
            urlParams += `${chave}=${valor}&`;
        }

        service.post(searchParameters, pageNumber, pageSize).subscribe({
            next: () => {
                fail('Operação de consultar processos deveria ter falhado');
            },
            error: (error) => {
                expect(error.status).withContext('Status deve ser 500').toBe(500);
            }
        });

        const req = http.expectOne(`${service['_url']}processos-judiciais?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`);
        expect(req.request.method).toBe('POST');

        req.flush('Erro', {
            status: 500,
            statusText: 'Internal Server Error'
        });
    });
});
