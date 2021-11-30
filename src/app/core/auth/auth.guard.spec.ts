import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AutenticacaoService } from '../services/autenticacao/autenticacao.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let autenticacaoService: any;

  beforeEach(() => {
    const autenticacaoServiceSpy = jasmine.createSpyObj('AutenticacaoService', ['']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AutenticacaoService, useValue: autenticacaoServiceSpy }
      ],
    });
    guard = TestBed.inject(AuthGuard);
    autenticacaoService = TestBed.inject(AutenticacaoService);
  });

  it('[CIT-5682] deve ser criar', () => {
    expect(guard).toBeTruthy();
  });
});
