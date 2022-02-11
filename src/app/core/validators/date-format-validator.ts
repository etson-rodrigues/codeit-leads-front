import { AbstractControl } from "@angular/forms";

import { formatarData } from "src/app/shared/utils/formatarData";

export function dateFormatValidator(control: AbstractControl) {
  if (control.pristine) {
    return null;
  }

  const reg = /(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d/;
  let data = formatarData(control.value);

  if (!control.value || !data.match(reg)) {
    return { errorFormatoData: true };
  }
  return null;
}