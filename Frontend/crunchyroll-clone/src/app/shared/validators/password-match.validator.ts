import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

export const passwordMatchValidator = (passwordControlName: string): AsyncValidatorFn => {
  return async (control: AbstractControl): Promise<ValidationErrors | null> => {
    if (!control.parent) {
      return null;
    }

    const password = control.parent.get(passwordControlName)?.value;
    const confirmPassword = control.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
};
