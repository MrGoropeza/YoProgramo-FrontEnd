import { Store } from '@ngrx/store';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { map, Observable, Subscription } from 'rxjs';
import { DynamicTableColumnModel } from 'src/app/components/ui-dynamic-table/ui-dynamic-table.component';
import { CrudState } from './crud-state/crud.reducer';

export class CrudComponent<Model> {
  cols: DynamicTableColumnModel[] = [];
  values$!: Observable<Model[]>;
  valuesLoading$!: Observable<boolean>;
  totalRecords$!: Observable<number>;

  onCloseSub$: Subscription = this.ref.onClose.subscribe(() =>
    this.store.dispatch(this.state.actions.closeCrudDialog())
  );

  constructor(
    public store: Store,
    public ref: DynamicDialogRef,
    protected state: CrudState<Model>,
  ) {}

  init() {
    const request = this.store.select(this.state.selectors.selectValues);
    this.values$ = request.pipe(map((response) => response.data));
    this.totalRecords$ = request.pipe(map((response) => response.totalRecords));
    this.valuesLoading$ = this.store.select(this.state.selectors.selectValuesLoading);
  }

  destroy() {
    this.onCloseSub$.unsubscribe();
  }
}
