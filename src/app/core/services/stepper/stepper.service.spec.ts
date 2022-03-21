import { TestBed } from '@angular/core/testing';

import { StepperService } from './stepper.service';

describe('StepperService', () => {
  let service: StepperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StepperService]
    });
    service = TestBed.inject(StepperService);
  });

  it('[CIT-5872] deve ser criado', () => {
    expect(service).toBeTruthy();
  });
});