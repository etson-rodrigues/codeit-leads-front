import { AbstractControl } from '@angular/forms';

import { formatarDataPtBr } from 'src/app/shared/utils/formatar-data';

export function dateFormatValidator(control: AbstractControl) {
    if (control.pristine) {
        return null;
    }

    const reg = /(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d/;
    let data = formatarDataPtBr(control.value);

    if (!control.value || !data.match(reg)) {
        return { errorFormatoData: true };
    }
    return null;
}
