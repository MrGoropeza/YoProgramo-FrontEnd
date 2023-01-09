import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function DateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(!control.value || (control.value as []).length < 0){
      return {required: true};
    }
    if((control.value as Array<Date>)[1] === null){
      return {endDateRequired: true}
    }
    return null;
  };
}
