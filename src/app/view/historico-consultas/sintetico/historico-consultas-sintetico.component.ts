import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { StepperService } from 'src/app/core/services/stepper/stepper.service';

@Component({
  selector: 'app-historico-consultas-sintetico',
  templateUrl: './historico-consultas-sintetico.component.html',
  styleUrls: ['./historico-consultas-sintetico.component.scss']
})
export class HistoricoConsultasSinteticoComponent implements OnInit {

  @ViewChild('stepper') private _stepper!: MatStepper;

  constructor(private _stepperService: StepperService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._stepperService.stepper = this._stepper;
    });
  }

}
