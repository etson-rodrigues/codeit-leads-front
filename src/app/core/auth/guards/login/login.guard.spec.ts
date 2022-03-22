import { NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { routes } from 'src/app/app-routing.module';
import { CookiesService } from 'src/app/core/services/cookies/cookies.service';
import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
    let guard: LoginGuard;
    let cookieService: jasmine.SpyObj<CookiesService>;

    beforeEach(() => {
        const cookieServiceSpy = jasmine.createSpyObj('CookiesService', ['hasItemCookie']);

        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes)],
            providers: [{ provide: CookiesService, useValue: cookieServiceSpy }],
            schemas: [NO_ERRORS_SCHEMA]
        });
        guard = TestBed.inject(LoginGuard);
        cookieService = TestBed.inject(CookiesService) as jasmine.SpyObj<CookiesService>;
    });

    it('[CIT-5794] deve ser criado', () => {
        expect(guard).toBeTruthy();
    });

    it('[CIT-5794] deve validar se o usuário está autenticado', fakeAsync(() => {
        cookieService.hasItemCookie.and.returnValue(false);
        flush();
        expect(guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{ url: 'login' })).toBeTruthy();
    }));

    it("[CIT-5794] não deve permitir acessar as rotas de 'login' ou 'redefinir-senha' caso já esteja autenticado", fakeAsync(() => {
        cookieService.hasItemCookie.and.returnValue(true);
        flush();
        expect(guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{ url: 'login' })).toBeFalsy();
        expect(guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{ url: 'redefinir-senha' })).toBeFalsy();
    }));
});
