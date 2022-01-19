import { NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { routes } from 'src/app/app-routing.module';
import { CookiesService } from '../../../services/cookies/cookies.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let cookieService: jasmine.SpyObj<CookiesService>;

  beforeEach(() => {
    const cookieServiceSpy = jasmine.createSpyObj('CookiesService', ['hasItemCookie', 'deleteCookie']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: CookiesService, useValue: cookieServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    guard = TestBed.inject(AuthGuard);
    cookieService = TestBed.inject(CookiesService) as jasmine.SpyObj<CookiesService>;
  });

  it('[CIT-5682] deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  it("[CIT-5794] não deve permitir acessar rotas privadas caso não esteja autenticado", fakeAsync(() => {
    cookieService.hasItemCookie.and.returnValue(false);
    flush();
    expect(guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{ url: 'processos-judiciais/consulta-geral' })).toBeFalsy();
  }));
});
