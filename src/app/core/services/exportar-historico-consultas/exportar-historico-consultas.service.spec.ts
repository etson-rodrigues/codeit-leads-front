import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SituacaoConsulta } from '../../enums/situacao-consulta.enum';
import { TipoConsulta } from '../../enums/tipo-consulta.enum';

import { ExportarHistoricoConsultasService } from './exportar-historico-consultas.service';

describe('ExportarHistoricoConsultasService', () => {
  let service: ExportarHistoricoConsultasService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ExportarHistoricoConsultasService]
    });
    service = TestBed.inject(ExportarHistoricoConsultasService);
    http = TestBed.inject(HttpTestingController);
  });

  it('[CIT-5944] deve criar', () => {
      expect(service).toBeTruthy();
  });

  it('[CIT-5944]  deve retornar a exportação dos historicos', () => {
    const searchParameters = {
      usuarioEmail: 'email@teste.com',
      tipoConsulta: TipoConsulta.Pesquisa,
      situacaoConsulta: SituacaoConsulta.Sucesso,
      dataInicial: '01/01/2022',
      dataFinal: '01/01/2023'
    };
    const fakeResponse = new Blob([''], { type: 'text/csv' });
    service.export(searchParameters).subscribe((response) => {
        expect(response instanceof Blob)
            .withContext('Retorno deve ser Blob')
            .toBeTruthy();
        expect(response.type).withContext('Tipo deve ser text/csv').toEqual('text/csv');
    });
    const req = http.expectOne(`${service['_url']}historico-consultas/exportar/sintetico`);
    expect(req.request.method).toBe('POST');
    req.flush(fakeResponse);
  });

  it('[CIT-5944] deve retornar erro caso exportação dos historicos falhar', () => {
    const searchParameters = {
      usuarioEmail: 'email@teste.com',
      tipoConsulta: TipoConsulta.Pesquisa,
      situacaoConsulta: SituacaoConsulta.Sucesso,
      dataInicial: '01/01/2022',
      dataFinal: '01/01/2023'
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
    const req = http.expectOne(`${service['_url']}historico-consultas/exportar/sintetico`);
    expect(req.request.method).toBe('POST');
    req.flush(fakeResponse, {
        status: 500,
        statusText: 'Internal Server Error'
    });
  });
});
