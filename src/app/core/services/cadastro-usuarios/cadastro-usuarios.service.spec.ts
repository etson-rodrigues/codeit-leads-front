import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { mockCadastroUsuarioRequest, mockCadastroUsuarioResponse } from '../../mocks/data/cadastro-usuario-mock';
import { CadastroUsuariosService } from './cadastro-usuarios.service';

describe('CadastroUsuariosService', () => {
  let service: CadastroUsuariosService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CadastroUsuariosService]
    });
    service = TestBed.inject(CadastroUsuariosService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  })

  it('[CIT-5693] deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('[CIT-5693] deve realizar o cadastro do usuário', () => {
    service.save(mockCadastroUsuarioRequest).subscribe(response => {
      expect(response.body!.data.email).withContext('Email deve ser teste@email.com').toBe(mockCadastroUsuarioRequest.email);
      expect(response.body!.data.primeiroAcesso).withContext('Primeiro acesso deve ser true').toBeTruthy();
      expect(response.status).withContext('Status deve ser 200').toBe(200);
    });

    const req = http.expectOne(`${service["_url"]}usuarios`);
    expect(req.request.method).withContext('Método da requisição deve ser POST').toEqual('POST');

    req.flush(mockCadastroUsuarioResponse);
  });

  it('[CIT-5693] deve gerar erro se cadastro do usuário falhar', () => {
    service.save(mockCadastroUsuarioRequest).subscribe(
      {
        next: () => {
          fail('Operação de salvar cadastro do usuário deveria ter falhado')
        },
        error: (error: HttpErrorResponse) => {
          expect(error.status).withContext('Status deve ser 500').toBe(500)
        }
      }
    );

    const req = http.expectOne(`${service["_url"]}usuarios`);
    expect(req.request.method).withContext('Método da requisição deve ser POST').toEqual('POST');

    req.flush('Cadastro do usuário falhou', {
      status: 500,
      statusText: 'Internal Server Error'
    });
  });
});
