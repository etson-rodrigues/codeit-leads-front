import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

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

  it('[CIT-5736] deve retornar dados dos processos', () => {
    const razaoSocial = 'teste';
    const pageNumber = 1;
    const pageSize = 3;

    service.get(razaoSocial, pageNumber, pageSize).subscribe(response => {
      expect(response.data.length).withContext('Deve retornar array com 3 elementos').toBe(3);
      expect(response.data.filter(item => item.numeroUnicoProtocolo == "2222222-22.2222.2.22.2222")).withContext('Deve possuir o NUP 2222222-22.2222.2.22.2222').toBeTruthy();
    })

    const req = http.expectOne(`${service["_url"]}processos-judiciais?razaoSocial=teste&pageNumber=1&pageSize=3`);
    expect(req.request.method).toBe("GET");

    req.flush(mockConsultaProcessosResponse);
  });

  it('[CIT-5736] deve retornar erro caso consulta dos processos falhar', () => {
    const razaoSocial = 'teste';
    const pageNumber = 1;
    const pageSize = 3;

    service.get(razaoSocial, pageNumber, pageSize).subscribe({
      next: () => {
        fail('Operação de consultar processos deveria ter falhado');
      },
      error: (error) => {
        expect(error.status).withContext('Status deve ser 500').toBe(500);
      }
    });

    const req = http.expectOne(`${service["_url"]}processos-judiciais?razaoSocial=teste&pageNumber=1&pageSize=3`);
    expect(req.request.method).toBe("GET");

    req.flush('Erro', {
      status: 500,
      statusText: 'Internal Server Error'
    });
  });
});
