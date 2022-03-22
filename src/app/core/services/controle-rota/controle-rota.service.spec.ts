import { NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';

import { CookiesService } from '../cookies/cookies.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { ControleRotaService } from './controle-rota.service';

describe('ControleRotaService', () => {
    let service: ControleRotaService;
    let cookieService: jasmine.SpyObj<CookiesService>;
    let localStorageService: jasmine.SpyObj<LocalStorageService>;

    beforeEach(() => {
        const cookieServiceSpy = jasmine.createSpyObj('CookiesService', ['deleteCookie']);
        const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['removeItemLocalStorage']);

        TestBed.configureTestingModule({
            providers: [
                { provide: CookiesService, useValue: cookieServiceSpy },
                { provide: LocalStorageService, useValue: localStorageServiceSpy }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
        service = TestBed.inject(ControleRotaService);
        cookieService = TestBed.inject(CookiesService) as jasmine.SpyObj<CookiesService>;
        localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
    });

    it('[CIT-5794] deve ser criado', () => {
        expect(service).toBeTruthy();
    });

    it('[CIT-5794] deve limpar dados do local storage e cookies de acordo com a rota informada', fakeAsync(() => {
        service.clearRouteData('/login');
        flush();
        expect(cookieService.deleteCookie).toHaveBeenCalledTimes(1);
        expect(localStorageService.removeItemLocalStorage).toHaveBeenCalledTimes(1);
    }));
});
