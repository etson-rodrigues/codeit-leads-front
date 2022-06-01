import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { map, Observable } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { CadastroComponent } from './steps/cadastro/cadastro.component';
import { ConfiguracaoDbjusComponent } from './steps/configuracao-dbjus/configuracao-dbjus.component';

@Component({
    selector: 'app-gerenciamento-usuarios',
    templateUrl: './gerenciamento-usuarios.component.html',
    styleUrls: ['./gerenciamento-usuarios.component.scss']
})
export class GerenciamentoUsuariosComponent implements OnInit {
    isEditing: boolean = false;
    isNewSearch: boolean = false;
    stepperOrientation!: Observable<StepperOrientation>;

    @ViewChild('stepper') private stepper!: MatStepper;
    @ViewChild('cadastro') private cadastro!: CadastroComponent;
    @ViewChild('configuracaoDBJus') private configuracaoDBJus!: ConfiguracaoDbjusComponent;

    constructor(private _breakpointObserver: BreakpointObserver) { }

    ngOnInit(): void {
        this.stepperOrientation = this._breakpointObserver.observe('(min-width: 800px)').pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    }

    getIsRegistered(isRegistered: boolean) {
        if (isRegistered) this.stepper.next();
    }

    getIsFinished(isFinished: boolean) {
        if (isFinished) {
            this.stepper.reset();
            this.cadastro.resetForm();
            this.configuracaoDBJus.resetForm();
        }
    }

    setIsEditing(isEditing: boolean) {
        this.isEditing = isEditing;
    }

    getIsUpdatedStatus(IsUpdatedStatus: boolean) {
        if (IsUpdatedStatus) {
            this.stepper.selectedIndex = 3;
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
