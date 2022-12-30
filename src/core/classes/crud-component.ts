import { Action, ActionCreator, Selector, Store } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subscription } from 'rxjs';
import { DynamicTableColumnModel } from './dynamic-table.model';

export class CrudComponent<Model> {
  cols: DynamicTableColumnModel[] = [];
  values$!: Observable<Model[]>;
  valuesLoading$!: Observable<boolean>;

  onCloseSub$: Subscription = this.ref.onClose.subscribe(() =>
    this.store.dispatch(this.closeAction)
  );

  constructor(
    public store: Store,
    public ref: DynamicDialogRef,
    public closeAction: Action,
    public valuesSelector: Selector<object, Model[]>,
    public ValuesLoadingSelector: Selector<object, boolean>,
  ) {}

  init(){
    this.values$ = this.store.select(this.valuesSelector);
    this.valuesLoading$ = this.store.select(this.ValuesLoadingSelector)
  }

  destroy(){
    this.onCloseSub$.unsubscribe();
  }

}
