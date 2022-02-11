import { AbstractControl } from "@angular/forms";

export function samePasswordValidator(senha: string, confirmarSenha: string) {
  return (controls: AbstractControl) => {
    const controlSenha = controls.get(senha);
    const controlConfirmarSenha = controls.get(confirmarSenha);

    if (controlConfirmarSenha?.errors && !controlConfirmarSenha.errors.devemSerSenhasIguais) {
      return;
    }

    if (controlSenha?.value !== controlConfirmarSenha?.value) {
      controlConfirmarSenha?.setErrors({ devemSerSenhasIguais: true });
    } else {
      controlConfirmarSenha?.setErrors(null);
    }
  }
}