import { Injectable } from '@angular/core';

import { MatStepper } from '@angular/material/stepper';

@Injectable({
    providedIn: 'root'
})
export class StepperService {
    private _indexStep: number = 0;
    private _idsSubmit: string[] = [];
    static myStepper: MatStepper;
    static isStepperForm: boolean;

    public set stepper(stepper: MatStepper) {
        StepperService.myStepper = stepper;
    }

    public get stepper() {
        return StepperService.myStepper;
    }

    public set index(index: number) {
        this._indexStep = index;
    }

    public get index(): number {
        return this._indexStep;
    }

    public set idSubmit(id: string) {
        this._idsSubmit.push(id);
    }

    public set stepperForm(isStepperForm: boolean) {
        StepperService.isStepperForm = isStepperForm;
    }

    public get stepperForm() {
        return StepperService.isStepperForm;
    }

    public previous() {
        if (this.stepper['_selectedIndex'] != 0) {
            this.stepper.previous();
            this.defineIndex();
            this.stepper.selected!.interacted = false;
        }
    }

    public next() {
        setTimeout(() => {
            if (this.stepper['_selectedIndex'] < this.stepper['steps'].length - 1) {
                this.stepper.next();
                this.defineIndex();
                this.stepper.selected!.interacted = false;
            }
        }, 100);
    }

    public submit() {
        if (this.stepper['_selectedIndex'] < this.stepper['steps'].length - 1) {
            this._formSubmit();
        }
    }

    public defineIndex() {
        this.index = this.stepper['_selectedIndex'];
    }

    private _formSubmit() {
        (<HTMLButtonElement>document.getElementById(this._idsSubmit[this.stepper['_selectedIndex']])).click();
    }
}
