import { ValidationErrors } from '@angular/forms';

export const getValidatorErrorMessage = (errors: ValidationErrors | null): string => {
  if (errors === null) return '';

  if (errors['required']) return `Field is required`;
  if (errors['email']) return `Incorrect email`;
  if (errors['passwordMismatch']) return `Password mismatch`;
  if (errors['minlength'])
    return `Invalid character length, minimum` + ` ${errors['minlength'].requiredLength}`;
  return `Error`;
};
