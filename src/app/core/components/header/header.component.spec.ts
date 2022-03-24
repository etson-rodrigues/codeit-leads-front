import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { routes } from 'src/app/app-routing.module';
import { HeaderModule } from './header.module';
import { HeaderComponent } from './header.component';
import { AutenticacaoService } from '../../services/autenticacao/autenticacao.service';
import { CookiesService } from '../../services/cookies/cookies.service';
import { MessageTrackerService } from '../../services/message-tracker/message-tracker.service';
import { mockLogoutResponse } from '../../mocks/data/autenticacao-mock';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let cookieService: jasmine.SpyObj<CookiesService>;
    let autenticacaoService: jasmine.SpyObj<AutenticacaoService>;
    let messageTrackerService: jasmine.SpyObj<MessageTrackerService>;

    beforeEach(
        waitForAsync(() => {
            const cookieServiceSpy = jasmine.createSpyObj('CookiesService', ['deleteCookie', 'hasItemCookie']);
            const autenticacaoServiceSpy = jasmine.createSpyObj('AutenticacaoService', ['logout']);
            const messageTrackerServiceSpy = jasmine.createSpyObj('MessageTrackerService', ['subscribeError']);

            TestBed.configureTestingModule({
                declarations: [HeaderComponent],
                imports: [HeaderModule, RouterTestingModule.withRoutes(routes)],
                providers: [
                    { provide: CookiesService, useValue: cookieServiceSpy },
                    { provide: AutenticacaoService, useValue: autenticacaoServiceSpy },
                    { provide: MessageTrackerService, useValue: messageTrackerServiceSpy }
                ],
                schemas: [NO_ERRORS_SCHEMA]
            })
                .compileComponents()
                .then(() => {
                    fixture = TestBed.createComponent(HeaderComponent);
                    cookieService = TestBed.inject(CookiesService) as jasmine.SpyObj<CookiesService>;
                    autenticacaoService = TestBed.inject(AutenticacaoService) as jasmine.SpyObj<AutenticacaoService>;
                    messageTrackerService = TestBed.inject(MessageTrackerService) as jasmine.SpyObj<MessageTrackerService>;
                    component = fixture.componentInstance;
                    fixture.detectChanges();
                });
        })
    );

    it('[CIT-5682] deve criar', () => {
        expect(component).toBeTruthy();
    });

    it('[CIT-5682] deve abrir sidenav ao clicar no botão de menu', () => {
        spyOn(component.openMenu, 'emit');
        component.toggleSidenav();
        expect(component.openMenu.emit).withContext('Deve emitir evento para abrir sidenav ao clicar no botão de menu').toHaveBeenCalledTimes(1);
    });

    it('[CIT-5917] deve apagar token do cookie ao realizar logout', () => {
        cookieService.deleteCookie.and.returnValue();
        autenticacaoService.logout.and.returnValue(of(mockLogoutResponse));
        component.logout();
        expect(cookieService.deleteCookie).toHaveBeenCalledTimes(1);
    });

    it('[CIT-5917] deve gerar erro quando falhar ao realizar logout', () => {
        autenticacaoService.logout.and.returnValue(throwError(() => new Error()));
        component.logout();
        expect(autenticacaoService.logout).withContext('Serviço de logout deve ser chamado uma vez').toHaveBeenCalledTimes(1);
        expect(messageTrackerService.subscribeError).withContext('Deve abrir o messageTracker ao retornar erro ao realizar logout').toHaveBeenCalledTimes(1);
    });
});
