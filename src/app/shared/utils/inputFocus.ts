import { ChangeDetectorRef } from "@angular/core";
import { FormGroup } from "@angular/forms";

export function inputFocus(formGroup: FormGroup, listaRef: any[], changeDetectorRef?: ChangeDetectorRef) {
  for (let ref of listaRef) {
    changeDetectorRef?.detectChanges();
    if (ref['_elementRef'] && ref['_elementRef'].nativeElement.nodeName) {
      if (formGroup.controls[ref['_elementRef'].nativeElement.id].invalid && ref['_elementRef'].nativeElement.nodeName == 'MAT-SELECT') {
        ref.focus();
        return ref.open();
      }
      changeDetectorRef?.detectChanges();
    }

    if (ref.nativeElement && formGroup.controls[ref.nativeElement.id].invalid && ref.nativeElement.nodeName == 'INPUT') {
      return ref.nativeElement.focus();
    }
  }
}