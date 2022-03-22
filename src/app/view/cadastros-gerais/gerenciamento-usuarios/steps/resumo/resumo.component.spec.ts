import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ResumoComponent } from './resumo.component';

describe('ResumoComponent', () => {
    let component: ResumoComponent;
    let fixture: ComponentFixture<ResumoComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ResumoComponent],
                schemas: [NO_ERRORS_SCHEMA]
            })
                .compileComponents()
                .then(() => {
                    fixture = TestBed.createComponent(ResumoComponent);
                    component = fixture.componentInstance;
                    fixture.detectChanges();
                });
        })
    );

    it('[CIT-5693] deve criar', () => {
        expect(component).toBeTruthy();
    });

    it('[CIT-5693] deve emitir evento para nova consulta', () => {
        spyOn(component.isFinished, 'emit');

        component.newSearch();

        expect(component.isFinished.emit).toHaveBeenCalledTimes(1);
    });
});
