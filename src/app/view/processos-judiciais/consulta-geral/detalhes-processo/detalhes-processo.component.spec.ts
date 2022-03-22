import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProcessosModule } from '../processos.module';
import { DetalhesProcessoComponent } from './detalhes-processo.component';
import { StepperService } from 'src/app/core/services/stepper/stepper.service';
import { mockDetalhesProcessoResponseData, mockDetalhesProcessoView } from 'src/app/core/mocks/data/detalhes-processo-mock';

describe('DetalhesProcessoComponent', () => {
    let component: DetalhesProcessoComponent;
    let fixture: ComponentFixture<DetalhesProcessoComponent>;
    let stepperService: jasmine.SpyObj<StepperService>;

    beforeEach(
        waitForAsync(() => {
            const stepperServiceSpy = jasmine.createSpyObj('StepperService', ['previous']);

            TestBed.configureTestingModule({
                declarations: [DetalhesProcessoComponent],
                imports: [ProcessosModule],
                providers: [{ provide: StepperService, useValue: stepperServiceSpy }],
                schemas: [NO_ERRORS_SCHEMA]
            })
                .compileComponents()
                .then(() => {
                    fixture = TestBed.createComponent(DetalhesProcessoComponent);
                    component = fixture.componentInstance;
                    component.detalhesProcesso = mockDetalhesProcessoResponseData;
                    stepperService = TestBed.inject(StepperService) as jasmine.SpyObj<StepperService>;
                    fixture.detectChanges();
                });
        })
    );

    it('[CIT-5872] deve criar', () => {
        expect(component).toBeTruthy();
    });

    it('[CIT-5872] deve inicializar com variável dadosProcesso preenchida', () => {
        component.ngOnChanges();
        expect(component.dadosProcesso).toEqual(mockDetalhesProcessoView);
    });

    it('[CIT-5872] deve apresentar mais andamentos ao clicar em "Ver mais"', () => {
        component.updateDadosProcesso();
        expect(component.dadosProcesso.andamentos.length).withContext('Andamentos deve ter tamanho 10').toBe(10);
        component.showMore();
        expect(component.dadosProcesso.andamentos.length).withContext('Andamentos deve ter tamanho 12').toBe(12);
    });

    it('[CIT-5872] deve chamar service do stepper para retornar a tela anterior ao clicar em "Retornar"', () => {
        component.return();
        expect(stepperService.previous).withContext('Previous do stepper deve ser chamado').toHaveBeenCalledTimes(1);
    });
});
