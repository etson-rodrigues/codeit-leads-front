import { AbstractControl } from "@angular/forms";

export function compareDateValidator(dataInicial: string, dataFinal: string) {
  return (controls: AbstractControl) => {
    const controlDataInicial = controls.get(dataInicial);
    const controlDataFinal = controls.get(dataFinal);

    if (controlDataFinal?.errors && !controlDataFinal.errors.dataFinalDeveSerMaiorDataInicial) {
      return;
    }

    if (!controlDataInicial?.value && !controlDataFinal?.value) {
      return;
    }

    if (controlDataInicial?.value && !controlDataFinal?.value) {
      return;
    }

    if (controlDataInicial?.value > controlDataFinal?.value) {
      controlDataFinal?.setErrors({ dataFinalDeveSerMaiorDataInicial: true });
    } else {
      controlDataFinal?.setErrors(null);
    }
  }
}