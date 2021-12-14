import { TestBed } from '@angular/core/testing';

import { ResumoService } from './resumo.service';

describe('ResumoService', () => {
  let service: ResumoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumoService);
  });

  it('[CIT-5693] deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('[CIT-5693] deve chamar getValues quando for chamado a função setValues', () => {
    spyOn(service.getValues, 'emit');
    service.setValues({});
    expect(service.getValues.emit).withContext('Deve chamar função getValues.emit uma vez').toHaveBeenCalledTimes(1)
  });
});
