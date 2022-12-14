import { FormGroup } from '@angular/forms';

export function validationInput(formGroup: FormGroup, formControlName: string): string | undefined {
    let errors = formGroup.controls[formControlName].errors;

    if (errors?.required) return 'O campo é obrigatório *.';

    if (errors?.maxlength) return `O campo deve ter no máximo ${errors.maxlength.requiredLength} caracteres.`;

    if (errors?.minlength) return `O campo deve ter no mínimo ${errors.minlength.requiredLength} caracteres.`;

    if (errors?.devemSerSenhasIguais) return 'A senha deve ser a mesma.';

    if (errors?.errorEmail) return 'O campo e-mail está inválido.';

    if (errors?.errorDataMax) return 'O campo deve ser menor ou igual a data atual.';

    if (errors?.dataFinalDeveSerMaiorDataInicial) return 'O campo data final deve ser maior ou igual a data inicial.';

    if (errors?.errorFormatoData) return 'O campo data deve estar no formato "dd/mm/yyyy".';

    if (errors?.errorCnpj) return 'CNPJ incorreto ou inválido.';
}
