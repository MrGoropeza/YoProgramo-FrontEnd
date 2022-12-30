import { CrudErrorMessage } from "../classes/ui-crud-error-message.model";

//TODO add mensajes de error para todos los validators del ReactiveFormsModule
export const defaultErrorMessages: CrudErrorMessage[] = [
  {
    errorKey: "required",
    errorMessage: "Campo requerido."
  }
]