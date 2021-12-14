import { FormGroup } from "@angular/forms";

export function validationInput(formGroup: FormGroup, formControlName: string): string | undefined {
  let errors = formGroup.controls[formControlName].errors;

  if (errors?.required) return 'O campo é obrigatório *.';

  if (errors?.maxlength) return `O campo deve ter no máximo ${errors.maxlength.requiredLength} caracteres.`;

  if (errors?.minlength) return `O campo deve ter no mínimo ${errors.minlength.requiredLength} caracteres.`;

  if (errors?.devemSerSenhasIguais) return 'A senha deve ser a mesma.';

  if (errors?.errorEmail) return 'O campo e-mail está inválido.';
}