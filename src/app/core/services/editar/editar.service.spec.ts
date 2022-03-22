import { TestBed } from '@angular/core/testing';

import { EditarService } from './editar.service';

describe('EditarService', () => {
    let service: EditarService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EditarService);
    });

    it('[CIT-5694] deve ser criado', () => {
        expect(service).toBeTruthy();
    });

    it('[CIT-5694] deve chamar getValues quando for chamado a função setValues', () => {
        spyOn(service.getValues, 'emit');
        service.setValues(true);
        expect(service.getValues.emit).withContext('Deve chamar função getValues.emit uma vez').toHaveBeenCalledTimes(1);
    });
});
