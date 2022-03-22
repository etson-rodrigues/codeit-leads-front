import { AbstractControl } from '@angular/forms';

export function emailValidator(control: AbstractControl) {
    if ((control.value && control.value.trim() === '') || !/^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(control.value)) return { errorEmail: true };
    return null;
}
