import { AbstractControl } from "@angular/forms";

export function currencyValidator(control: AbstractControl) {
  if (control.value <= 0) {
    return { errorCurrency: true };
  }
  return null;
}