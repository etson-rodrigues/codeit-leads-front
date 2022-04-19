import { AbstractControl } from '@angular/forms';
import { cnpjValidator } from './cnpj-validator';

export function razaoSocialCnpjValidator(control: AbstractControl) {
    const value = control.value || '';    

    if (!isCnpjTyped(value))
        return null;

    return cnpjValidator(value) ? null : { errorCnpj: true };
}

export function isCnpjTyped(value: string): boolean {    
    const field = value || '';

    if (isRazaoSocial(field))
        return false;

    return isCnpj(field);
}

function isCnpj(value: string): boolean {    
    const quantidadeMinimaDigitos = 7;

    return value.trim().replace(/\D/g, '').length >= quantidadeMinimaDigitos;
}

function isRazaoSocial(value: string): boolean {
    return value.trim().replace(/[^A-Za-z]+/g, '').length > 0;
}