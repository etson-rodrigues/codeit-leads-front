import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { routes } from 'src/app/app-routing.module';
import { HeaderModule } from './header.module';
import { CookiesService } from '../../services/cookies/cookies.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let cookieService: jasmine.SpyObj<CookiesService>;

    beforeEach(
        waitForAsync(() => {
            const cookieServiceSpy = jasmine.createSpyObj('CookiesService', ['deleteCookie', 'hasItemCookie']);

            TestBed.configureTestingModule({
                declarations: [HeaderComponent],
                imports: [HeaderModule, RouterTestingModule.withRoutes(routes)],
                providers: [{ provide: CookiesService, useValue: cookieServiceSpy }],
                schemas: [NO_ERRORS_SCHEMA]
            })
                .compileComponents()
                .then(() => {
                    fixture = TestBed.createComponent(HeaderComponent);
                    cookieService = TestBed.inject(CookiesService) as jasmine.SpyObj<CookiesService>;
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

    it('[CIT-5794] deve apagar token do cookie', fakeAsync(() => {
        cookieService.deleteCookie.and.returnValue();
        component.logout();
        flush();
        expect(cookieService.deleteCookie).toHaveBeenCalledTimes(1);
    }));
});
