import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { routes } from 'src/app/app-routing.module';
import { TimerComponent } from 'src/app/shared/components/timer/timer.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

describe('PaginaNaoEncontradaComponent', () => {
    let component: PaginaNaoEncontradaComponent;
    let fixture: ComponentFixture<PaginaNaoEncontradaComponent>;

    const spyTimerComponent = jasmine.createSpyObj('TimerComponent', ['iniciarContagem']);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PaginaNaoEncontradaComponent, TimerComponent],
            imports: [RouterTestingModule.withRoutes(routes)],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PaginaNaoEncontradaComponent);
        component = fixture.componentInstance;
        component['clearInterval']();
        fixture.detectChanges();
    });

    it('[CIT-5913] deve criar', () => {
        expect(component).toBeTruthy();
    });

    it('[CIT-5913] deve iniciar contador do TimerComponent', () => {
        component['_timer'] = spyTimerComponent;
        component['iniciaContador']();
        expect(spyTimerComponent.iniciarContagem).toHaveBeenCalled();
    });

    it('[CIT-5913] deve zerar o contador ao concluir o timer', fakeAsync(() => {
        component['_timer'] = spyTimerComponent;
        expect(component['contador']).toBe(10);
        component['iniciaContador']();

        fixture.autoDetectChanges();
        tick(10000);

        expect(spyTimerComponent.iniciarContagem).toHaveBeenCalled();
        expect(component['contador']).toBe(0);
    }));
});
