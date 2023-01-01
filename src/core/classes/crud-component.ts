import { Action, Selector, Store } from '@ngrx/store';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { map, Observable, Subscription } from 'rxjs';
import { MultipleRecordsResponse } from 'src/app/project/models/MultipleRecordsResponse';
import { CrudState } from './crud-state/crud.reducer';
import { DynamicTableColumnModel } from './dynamic-table.model';

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
