import { TestBed } from '@angular/core/testing';

import { CookiesService } from './cookies.service';

const valueCookie = { teste: '123' };

describe('CookiesService', () => {
    let service: CookiesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CookiesService);
    });

    it('[CIT-5596] deve ser criado', () => {
        expect(service).toBeTruthy();
    });

    it('[CIT-5596] deve salvar o cookie no navegador', () => {
        service.setCookie('teste', JSON.stringify(valueCookie), 30);
        expect(JSON.parse(service.getCookie('teste')!)).toEqual(valueCookie);
    });

    it('[CIT-5596] deve remover o cookie do navegador', () => {
        service.setCookie('teste', JSON.stringify(valueCookie), 30);
        expect(JSON.parse(service.getCookie('teste')!)).toEqual(valueCookie);

        service.deleteCookie('teste');
        expect(JSON.parse(service.getCookie('teste')!)).toBeNull();
    });
});
