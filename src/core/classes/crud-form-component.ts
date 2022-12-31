import { FormBuilder, FormGroup } from '@angular/forms';
import { Selector, Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

export class CrudFormComponent {
  form!: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    protected config: DynamicDialogConfig,
    protected fb: FormBuilder,
    protected store: Store,
    protected operationStateSelector: Selector<object, string>
  ) {}

  init() {
    if (this.config.data) {
      this.form.patchValue(this.config.data.techType);
    }
  }

  saved!: Subscription;

  destroy() {
    if (this.saved) {
      this.saved.unsubscribe();
    }
  }

  cargando = false;

  cancelar() {
    this.cargando = false;
    this.ref.close();
  }

  savedValue(){
    const operationState$ = this.store.select(this.operationStateSelector);

    this.saved = operationState$
      .subscribe(
        (value) => {
          if(value === "error"){
            this.cargando = false;
          }else if(value === "success"){
            this.cancelar();
          }

        }
      );
  }

}
