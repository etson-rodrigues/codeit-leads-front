import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { StepperService } from 'src/app/core/services/stepper/stepper.service';

@Component({
  selector: 'app-historico-consultas-analitico',
  templateUrl: './historico-consultas-analitico.component.html',
  styleUrls: ['./historico-consultas-analitico.component.scss']
})
export class HistoricoConsultasAnaliticoComponent implements OnInit {

  @ViewChild('stepper') private _stepper!: MatStepper;

  constructor(private _stepperService: StepperService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._stepperService.stepper = this._stepper;
    });
  }

}
