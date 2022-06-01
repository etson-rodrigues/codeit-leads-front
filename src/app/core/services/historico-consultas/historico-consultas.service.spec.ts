import { SituacaoConsulta } from './../../enums/situacao-consulta.enum';
import { TipoConsulta } from './../../enums/tipo-consulta.enum';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HistoricoConsultasService } from './historico-consultas.service';
import { mockHistoricoConsultasSinteticoResponse } from '../../mocks/data/historico-consultas-mock';

describe('HistoricoConsultasService', () => {
  let service: HistoricoConsultasService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [HistoricoConsultasService]
    });
    service = TestBed.inject(HistoricoConsultasService);
    http = TestBed.inject(HttpTestingController);
  });

  it('[CIT-5944] deve criar', () => {
      expect(service).toBeTruthy();
  });

  it('[CIT-5944] deve retornar dados dos historicos', () => {
    const searchParameters = {      
      dataFinal: '01/01/2023',
      dataInicial: '01/01/2022',
      usuarioEmail: null,
      tipoConsulta: TipoConsulta.Pesquisa,
      situacaoConsulta: SituacaoConsulta.Sucesso      
    };

    const pageNumber = 1;
    const pageSize = 3;

    const params = {      
      dataFinal: '2023-01-01',
      dataInicial: '2022-01-01',
      tipoConsulta: searchParameters.tipoConsulta,
      situacaoConsulta: searchParameters.situacaoConsulta,
      pageNumber: 1,
      pageSize: 3
    };

    let urlParams = '';
    for (const [chave, valor] of Object.entries(params)) {
        urlParams += `${chave}=${valor}&`;
    }

    service.getSinteticoBy(searchParameters, pageNumber, pageSize).subscribe((response) => {
      expect(response.data.length).withContext('Deve retornar array com 3 elementos').toBe(3);
      expect(response.data.filter((item) => item.usuarioEmail == 'email@teste.com'))
        .withContext('Deve possuir o e-mail email@teste.com')
        .toBeTruthy();
    });

    const req = http.expectOne(`${service['_url']}historico-consultas/sintetico?${urlParams.slice(0, -1)}`);
    expect(req.request.method).toBe('GET');  
    
    req.flush(mockHistoricoConsultasSinteticoResponse);    
  });
});
