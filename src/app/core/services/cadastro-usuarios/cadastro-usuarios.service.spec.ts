import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { mockCadastroUsuarioRequest, mockCadastroUsuarioResponse, mockCadastroUsuarioUpdateStatusRequest, mockConsultaUsuarioPaginateResponse } from '../../mocks/data/cadastro-usuario-mock';
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
    service.save(mockCadastroUsuarioRequest, false, 0).subscribe(response => {
      expect(response.data.email).withContext('Email deve ser teste@email.com').toBe(mockCadastroUsuarioRequest.email);
      expect(response.data.primeiroAcesso).withContext('Primeiro acesso deve ser true').toBeTruthy();
    });

    const req = http.expectOne(`${service["_url"]}usuarios`);
    expect(req.request.method).withContext('Método da requisição deve ser POST').toEqual('POST');

    req.flush(mockCadastroUsuarioResponse);
  });

  it('[CIT-5693] deve gerar erro se cadastro do usuário falhar', () => {
    service.save(mockCadastroUsuarioRequest, false, 0).subscribe(
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

  it('[CIT-5694] deve realizar a atualização do usuário', () => {
    const id = 1;
    service.save(mockCadastroUsuarioRequest, true, id).subscribe(response => {
      expect(response.data.email).withContext('Email deve ser teste@email.com').toBe(mockCadastroUsuarioRequest.email);
      expect(response.data.primeiroAcesso).withContext('Primeiro acesso deve ser true').toBeTruthy();
    });

    const req = http.expectOne(`${service["_url"]}usuarios/${id}`);
    expect(req.request.method).withContext('Método da requisição deve ser PUT').toEqual('PUT');

    req.flush(mockCadastroUsuarioResponse);
  });

  it('[CIT-5694] deve gerar erro se a atualização do usuário falhar', () => {
    const id = 1;
    service.save(mockCadastroUsuarioRequest, true, 1).subscribe(
      {
        next: () => {
          fail('Operação de atualizar cadastro do usuário deveria ter falhado')
        },
        error: (error: HttpErrorResponse) => {
          expect(error.status).withContext('Status deve ser 500').toBe(500)
        }
      }
    );

    const req = http.expectOne(`${service["_url"]}usuarios/${id}`);
    expect(req.request.method).withContext('Método da requisição deve ser PUT').toEqual('PUT');

    req.flush('Cadastro do usuário falhou', {
      status: 500,
      statusText: 'Internal Server Error'
    });
  });

  it('[CIT-5694] deve realizar a atualização do status do usuário', () => {
    const id = mockCadastroUsuarioUpdateStatusRequest.id;
    const status = mockCadastroUsuarioUpdateStatusRequest.status;
    service.updateStatus(mockCadastroUsuarioUpdateStatusRequest).subscribe(response => {
      expect(response.data.email).withContext('Email deve ser teste@email.com').toBe(mockCadastroUsuarioUpdateStatusRequest.email);
      expect(response.data.ativo).withContext('Status deve ser true').toBe(mockCadastroUsuarioUpdateStatusRequest.status);
    });

    const req = http.expectOne(`${service["_url"]}usuarios/${id}/atualizar-status?atualizarStatus=${status}`);
    expect(req.request.method).withContext('Método da requisição deve ser PUT').toEqual('PUT');

    req.flush(mockCadastroUsuarioResponse);
  });

  it('[CIT-5694] deve gerar erro se a atualização do status do usuário falhar', () => {
    const id = mockCadastroUsuarioUpdateStatusRequest.id;
    const status = mockCadastroUsuarioUpdateStatusRequest.status;
    service.updateStatus(mockCadastroUsuarioUpdateStatusRequest).subscribe(
      {
        next: () => {
          fail('Operação de atualizar status do usuário deveria ter falhado')
        },
        error: (error: HttpErrorResponse) => {
          expect(error.status).withContext('Status deve ser 500').toBe(500)
        }
      }
    );

    const req = http.expectOne(`${service["_url"]}usuarios/${id}/atualizar-status?atualizarStatus=${status}`);
    expect(req.request.method).withContext('Método da requisição deve ser PUT').toEqual('PUT');

    req.flush('Cadastro do usuário falhou', {
      status: 500,
      statusText: 'Internal Server Error'
    });
  });

  it('[CIT-5694] deve retornar dados dos usuários', () => {
    const email = "teste@email.com";
    const pageNumber = 1;
    const pageSize = 3;
    service.get(email, pageNumber, pageSize).subscribe(response => {
      expect(response.data.find(item => item.email == email)).withContext('Deve possuir o email teste@email.com').toBeTruthy();
    });

    const req = http.expectOne(`${service["_url"]}usuarios?email=teste@email.com&pageNumber=1&pageSize=3`);
    expect(req.request.method).withContext('Método da requisição deve ser GET').toEqual('GET');

    req.flush(mockConsultaUsuarioPaginateResponse);
  });

  it('[CIT-5694] deve retornar erro caso consulta dos usuários falhar', () => {
    const email = "teste@email.com";
    const pageNumber = 1;
    const pageSize = 3;
    service.get(email, pageNumber, pageSize).subscribe(
      {
        next: () => {
          fail('Operação de consultar usuários deveria ter falhado')
        },
        error: (error: HttpErrorResponse) => {
          expect(error.status).withContext('Status deve ser 500').toBe(500)
        }
      }
    );

    const req = http.expectOne(`${service["_url"]}usuarios?email=teste@email.com&pageNumber=1&pageSize=3`);
    expect(req.request.method).withContext('Método da requisição deve ser GET').toEqual('GET');

    req.flush('Cadastro do usuário falhou', {
      status: 500,
      statusText: 'Internal Server Error'
    });
  });
});
