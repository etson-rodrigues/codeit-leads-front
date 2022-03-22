import { AbstractControl } from '@angular/forms';

export function MaioridadeValidator(control: AbstractControl) {
    let dataAtual = new Date();

    let dataNascimento = new Date(control.value);

    let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
    let subtracaoMes = dataAtual.getMonth() - dataNascimento.getMonth();
    if (subtracaoMes < 0 || (subtracaoMes === 0 && dataAtual.getDate() < dataNascimento.getDate())) idade--;

    if (idade < 18) {
        return { errorMaioridade: true };
    }

    return null;
}
