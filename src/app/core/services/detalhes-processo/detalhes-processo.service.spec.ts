import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { mockDetalhesProcessoResponse } from '../../mocks/data/detalhes-processo-mock';
import { DetalhesProcessoService } from './detalhes-processo.service';

describe('DetalhesProcesso', () => {
    let service: DetalhesProcessoService;
    let http: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(DetalhesProcessoService);
        http = TestBed.inject(HttpTestingController);
    });

    it('[CIT-5870] deve ser criado', () => {
        expect(service).toBeTruthy();
    });

    it('[CIT-5870] deve retornar dados do detalhe do processo', () => {
        const nup = '0000117-36.2022.5.09.0004';

        service.get(nup).subscribe((response) => {
            expect(response.data[0].partes.partesAtivas.length).withContext('Deve retornar o array Ativos com 1 elemento').toBe(1);
            expect(response.data[0].partes.partesPassivas.length).withContext('Deve retornar o array Passivos com 2 elementos').toBe(2);
            expect(response.data[0].andamentos.length).withContext('Deve retornar o array Andamento com 12 elementos').toBe(12);
            expect(response.data[0].nup).withContext('Deve possuir o NUP 0000117-36.2022.5.09.0004').toEqual('0000117-36.2022.5.09.0004');
        });

        const req = http.expectOne(`${service['_url']}detalhes-processo?nup=${nup}`);
        expect(req.request.method).toBe('GET');

        req.flush(mockDetalhesProcessoResponse);
    });
});
