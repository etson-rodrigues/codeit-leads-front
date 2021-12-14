import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { map, Observable } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { CadastroComponent } from './steps/cadastro/cadastro.component';

@Component({
  selector: 'app-gerenciamento-usuarios',
  templateUrl: './gerenciamento-usuarios.component.html',
  styleUrls: ['./gerenciamento-usuarios.component.scss']
})
export class GerenciamentoUsuariosComponent implements OnInit {

  @ViewChild('stepper') private stepper!: MatStepper;
  @ViewChild('cadastro') private cadastro!: CadastroComponent;

  stepperOrientation!: Observable<StepperOrientation>;

  constructor(private _breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.stepperOrientation = this._breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  newSearch(stepper: MatStepper) {
    stepper.reset();
  }

  getIsRegistered(isRegistered: boolean) {
    if (isRegistered) this.stepper.next();
  }

  getIsFinished(isFinished: boolean) {
    if (isFinished) {
      this.stepper.reset();
      this.cadastro.resetForm();
    }
  }

  setPreviousStep() {
    this.stepper.previous();
    this.stepper.selected!.interacted = false;
  }

  setNextStep() {
    this.stepper.next();
    this.stepper.selected!.interacted = false;
  }
}
