import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AutenticacaoService } from './autenticacao.service';
import { mockLoginResponse, mockUserLogin } from '../../mocks/data/autenticacao-mock';

describe('AutenticacaoService', () => {
  let service: AutenticacaoService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AutenticacaoService]
    });
    service = TestBed.inject(AutenticacaoService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('[CIT-5680] deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('[CIT-5680] deve retornar email, token e tipo de acesso após o login', () => {
    const status = 201;
    const statusText = 'Created';

    service.login(mockUserLogin).subscribe(response => {
      expect(response.data.email).withContext('Email deve ser o mesmo do request').toBe(mockLoginResponse.data.email);
      expect(response.data.accessToken).withContext('Deve retornar um token').toBeTruthy();
      expect(['Administrador', 'Operador']).withContext('Tipo de acesso deve ser Administrador ou Operador').toContain(response.data.perfil.descricao);
    });

    const req = http.expectOne(`${service["_url"]}login`);
    expect(req.request.method).withContext('Método da requisição deve ser POST').toEqual('POST');

    req.flush(mockLoginResponse, { status, statusText });
  });

  it('[CIT-5680] deve retornar erro caso login do usuário falhar', () => {
    const status = 400;
    const statusText = 'Bad Request';
    const errorEvent = new ErrorEvent('Invalid request');

    service.login(mockUserLogin).subscribe({
      next: () => {
        fail('Next handler não deve ser chamado');
      },
      error: (error) => {
        expect(error.status).withContext('O código do status deve ser 400').toBe(400);
        expect(error.statusText).withContext('O texto do statusText deve ser Bad Request').toBe('Bad Request');
      },
      complete: () => {
        fail('Complete handler não deve ser chamado');
      }
    });

    const req = http.expectOne(`${service["_url"]}login`);
    expect(req.request.method).withContext('Método da requisição deve ser POST').toEqual('POST');

    req.error(errorEvent, { status, statusText });
  });

  it('[CIT-5682] deve definir variável de dados do usuário após login', () => {
    expect(service['_loginInfo']).withContext('Variável _loginInfo deve inicializar indefinida').toBeUndefined();
    service.setLoginInfo(mockLoginResponse);
    expect(service['_loginInfo']).withContext('Variável _loginInfo deve ser preenchida após chamar a função setLoginInfo').toBe(mockLoginResponse.data);
  });

  it('[CIT-5682] deve retornar dados do usuário logado', () => {
    expect(service['_loginInfo']).withContext('Variável _loginInfo deve inicializar indefinida').toBeUndefined();
    service.setLoginInfo(mockLoginResponse);
    expect(service['_loginInfo']).withContext('Variável _loginInfo deve ser preenchida após chamar a função setLoginInfo').toBe(mockLoginResponse.data);

    expect(service.getLoginInfo()).withContext('Deve retornar dados do usuário logado').toBeDefined();
  });
});
