import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { mockPerfisListResponse } from '../../mocks/data/perfis-mock';
import { PerfisService } from './perfis.service';

describe('PerfisService', () => {
  let service: PerfisService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PerfisService]
    });
    service = TestBed.inject(PerfisService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('[CIT-5693] deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('[CIT-5693] deve retornar uma lista de perfis', () => {
    service.getPerfis().subscribe(response => {
      expect(response.data.length).withContext('Deve possuir 2 perfis').toEqual(2);
      expect(response.data.filter(perfil => perfil.descricao == "Operador")).withContext('Deve possuir perfil Operador').toBeTruthy()
    });

    const req = httpMock.expectOne(`${service["_url"]}perfis`);
    expect(req.request.method).toBe("GET");

    req.flush(mockPerfisListResponse);
  });
});
