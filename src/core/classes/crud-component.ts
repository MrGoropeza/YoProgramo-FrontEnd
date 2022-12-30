import { Action, Selector, Store } from '@ngrx/store';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter, map, Observable, Subscription } from 'rxjs';
import { MultipleRecordsResponse } from 'src/app/project/models/MultipleRecordsResponse';
import { DynamicTableColumnModel } from './dynamic-table.model';

export class CrudComponent<Model> {
  cols: DynamicTableColumnModel[] = [];
  values$!: Observable<Model[]>;
  valuesLoading$!: Observable<boolean>;
  totalRecords$!: Observable<number>;

  onCloseSub$: Subscription = this.ref.onClose.subscribe(() =>
    this.store.dispatch(this.closeAction)
  );

  constructor(
    public store: Store,
    public ref: DynamicDialogRef,
    public closeAction: Action,
    public valuesSelector: Selector<object, MultipleRecordsResponse<Model>>,
    public ValuesLoadingSelector: Selector<object, boolean>
  ) {}

  init() {
    const request = this.store.select(this.valuesSelector);
    this.values$ = request.pipe(
      map((response) => {
        if (response) {
          return response.data;
        }
        return [];
      })
    );
    this.totalRecords$ = request.pipe(
      map((response) => {
        if (response) {
          return response.totalRecords;
        }
        return 0;
      })
    );
    this.valuesLoading$ = this.store.select(this.ValuesLoadingSelector);
  }

  destroy() {
    this.onCloseSub$.unsubscribe();
  }
}
