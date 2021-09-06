import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function noPrivilageElevationValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const command = control.value; 

    if (!command) return null;

    const forbiddenCommandsRegex = /^(sudo|sh|bash|zsh|fish|tcsh|ksh)\s.*$/;
    const matchesFound = command.match(forbiddenCommandsRegex);

    return matchesFound ? { privilageElevationRisk: true } : null;
  }
}
