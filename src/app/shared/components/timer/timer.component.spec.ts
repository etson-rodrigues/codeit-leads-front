import { SimpleChange } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { mockTheme1 } from 'src/app/core/mocks/data/theme-mock';
import { ThemeService } from 'src/app/core/services/theme/theme.service';
import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
    let component: TimerComponent;
    let fixture: ComponentFixture<TimerComponent>;
    let themeService: ThemeService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TimerComponent],
            providers: [ThemeService]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TimerComponent);
        themeService = TestBed.inject(ThemeService);
        component = fixture.componentInstance;
        window.localStorage.clear();
        fixture.detectChanges();
    });

    it('[CIT-5913] deve criar', fakeAsync(() => {
        expect(component).toBeTruthy();
        flush();
    }));

    it("[CIT-5913] deve iniciar o método o 'ngOnChanges' quando houver mudanças na variável 'svgSize' ou 'tempo'", () => {
        const spyNgOnChanges = spyOn(component, 'ngOnChanges').and.callThrough();

        expect(component.svgSize).toBe(100);
        component.svgSize = 50;

        component.ngOnChanges({
            svgSize: new SimpleChange(null, component.svgSize, false)
        });
        fixture.detectChanges();

        expect(spyNgOnChanges).toHaveBeenCalled();
        expect(component.svgSize).toBe(50);
    });

    it("[CIT-5913] deve alterar o valor da variável '_segundosPassados' conforme vai sendo realizada a contagem regressiva", fakeAsync(() => {
        expect(component.tempoSegundos).withContext("A Variável 'tempoSegundos' deve ser igual a 3").toBe(3);
        expect(component['_segundosPassados']).withContext("A Variável '_segundosPassados' deve ser igual a 0").toBe(0);
        component['_processarContagemRegressiva']();

        fixture.autoDetectChanges();
        tick(3000);

        expect(component['_segundosPassados']).withContext("A Variável '_segundosPassados' deve ser maior ou igual a variável 'tempoSegundos'").toBeGreaterThanOrEqual(component.tempoSegundos);
    }));

    it("[CIT-5913] deve retornar a cor padrão '#0077a9' do tema selecionado", () => {
        themeService.getTheme = jasmine.createSpy().and.returnValue(mockTheme1);
        const corPadrao = component['_corTemaPadrao']();
        expect(corPadrao).toEqual('#0077a9');
    });

    it("[CIT-5913] deve retornar a cor padrão '#ffffff' se não possuí tema padrão tema selecionado", () => {
        const corPadrao = component['_corTemaPadrao']();
        expect(corPadrao).toEqual('#ffffff');
    });
});
