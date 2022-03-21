import { Component, OnInit, ViewChild } from '@angular/core';

import { MatStepper } from '@angular/material/stepper';

import { StepperService } from 'src/app/core/services/stepper/stepper.service';
import { DetalhesProcesso } from 'src/app/core/models/detalhes-processo/detalhes-processo-response.model';

@Component({
  selector: 'app-processos',
  templateUrl: './processos.component.html',
  styleUrls: ['./processos.component.scss']
})
export class ProcessosComponent implements OnInit {

  detalhesProcesso!: DetalhesProcesso;

  @ViewChild('stepper') private _stepper!: MatStepper;

  constructor(
    private _stepperService: StepperService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._stepperService.stepper = this._stepper;
    });
  }

  passingData(data: DetalhesProcesso) {
    this.detalhesProcesso = data;
  }
}