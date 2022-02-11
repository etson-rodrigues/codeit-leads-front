import { AbstractControl } from "@angular/forms";

export function maxDateValidator(control: AbstractControl) {
  let dataAtual = new Date();
  let dataSelecionada = control.value;

  if (dataSelecionada > dataAtual) {
    return { errorDataMax: true };
  }

  return null;
}