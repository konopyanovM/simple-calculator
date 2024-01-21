import {getValidatorErrorMessage} from "@app/core/helpers/getValidatorErrorMessage";
import {AbstractControl} from "@angular/forms";

export const getErrorMessage = (formControl: AbstractControl | null): string => {
  if (formControl === null) return '';
  if (!formControl.pristine && formControl.touched)
    return getValidatorErrorMessage(formControl.errors);
  else return '';
};
