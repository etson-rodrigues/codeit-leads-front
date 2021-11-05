import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [SpinnerService],
      schemas: [NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(SpinnerService);
  });

  it('[CIT-5596] deve ser criado', () => {
    expect(service).toBeTruthy();
  });
});
