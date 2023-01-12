import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CrudState } from './crud-state/crud.reducer';

export class CrudFormComponent<Model> {
  form!: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    protected config: DynamicDialogConfig,
    protected fb: FormBuilder,
    protected store: Store,
    protected state: CrudState<Model>
  ) {}

  init() {
    if (this.config.data) {
      this.form.patchValue(this.config.data.value);
    }
  }

  suscriptions$: Subscription = new Subscription();

  destroy() {
    this.suscriptions$.unsubscribe();
  }

  cargando = false;

  cancelar() {
    this.cargando = false;
    this.ref.close();
  }

  savedValue() {
    const operationState$ = this.store.select(
      this.state.selectors.selectValuesOperationState
    );

    this.suscriptions$.add(
      operationState$.subscribe((value) => {
        if (value === 'error') {
          this.cargando = false;
        } else if (value === 'success') {
          this.cancelar();
        }
      })
    );
  }
}
