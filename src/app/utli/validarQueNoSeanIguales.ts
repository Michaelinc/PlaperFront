import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const validarQueNoSeanIguales: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const idCuentaOrigen = control.get('idCuentaOrigen');
  const idCuentaDestino = control.get('idCuentaDestino');

  return idCuentaOrigen.value != idCuentaDestino.value ? null : { 'SonIguales': true };
};