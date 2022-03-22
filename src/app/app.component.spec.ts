import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { AutenticacaoService } from './core/services/autenticacao/autenticacao.service';

describe('AppComponent', () => {
    let app: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let autenticacaoService: any;

    beforeEach(async () => {
        const autenticacaoServiceSpy = jasmine.createSpyObj('AutenticacaoService', ['']);
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AppComponent],
            providers: [{ provide: AutenticacaoService, useValue: autenticacaoServiceSpy }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        autenticacaoService = TestBed.inject(AutenticacaoService);
        app = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('[CIT-5596] deve criar o app', () => {
        expect(app).toBeTruthy();
    });
});
