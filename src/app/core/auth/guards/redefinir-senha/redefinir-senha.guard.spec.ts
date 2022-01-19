import { NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { routes } from 'src/app/app-routing.module';
import { mockLoginResponse, mockLoginResponseRedefinirSenha } from 'src/app/core/mocks/data/autenticacao-mock';
import { CookiesService } from 'src/app/core/services/cookies/cookies.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { RedefinirSenhaGuard } from './redefinir-senha.guard';

describe('RedefinirSenhaGuard', () => {
  let guard: RedefinirSenhaGuard;
  let cookieService: jasmine.SpyObj<CookiesService>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const cookieServiceSpy = jasmine.createSpyObj('CookiesService', ['hasItemCookie']);
    const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['getItemLocalStorage']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: CookiesService, useValue: cookieServiceSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    guard = TestBed.inject(RedefinirSenhaGuard);
    cookieService = TestBed.inject(CookiesService) as jasmine.SpyObj<CookiesService>;
    localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  it('[CIT-5794] deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  it("[CIT-5794] deve acessar rota redefinir-senha caso flag redefinirSenha seja true", fakeAsync(() => {
    localStorageService.getItemLocalStorage.and.returnValue(JSON.stringify(mockLoginResponseRedefinirSenha.data));
    cookieService.hasItemCookie.and.returnValue(false);
    flush();
    expect(guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{ url: 'redefinir-senha' })).toBeTruthy();
  }));

  it("[CIT-5794] não deve permitir acessar redefinir-senha caso flag redefinirSenha seja false ", fakeAsync(() => {
    localStorageService.getItemLocalStorage.and.returnValue(JSON.stringify(mockLoginResponse.data));
    cookieService.hasItemCookie.and.returnValue(false);
    flush();
    expect(guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{ url: 'redefinir-senha' })).toBeFalsy();
  }));

  it("[CIT-5794] não deve permitir acessar as rotas de 'login' ou 'redefinir-senha' caso já esteja autenticado", fakeAsync(() => {
    cookieService.hasItemCookie.and.returnValue(true);
    flush();
    expect(guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{ url: 'login' })).toBeFalsy();
    expect(guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{ url: 'redefinir-senha' })).toBeFalsy();
  }));
});
