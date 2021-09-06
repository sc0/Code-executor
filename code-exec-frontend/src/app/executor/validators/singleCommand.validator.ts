import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function singleCommandValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const command = control.value; 

    if (!command) return null;

    const multicommandRegex = /(;|\&\&|\|\|)(?=(?:[^"]*"[^"]*")*[^"]+$)/;
    const matchesFound = command.match(multicommandRegex);

    return matchesFound ? { multicommand: true } : null;
  }
}
