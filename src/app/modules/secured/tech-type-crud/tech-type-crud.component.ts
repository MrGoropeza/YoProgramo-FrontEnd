import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { TipoTecnologia } from 'src/app/project/models/tech.model';
import { DynamicTableColumnModel } from 'src/core/classes/dynamic-table.model';
import {
  selectTechTypes,
  selectTechTypesLoading,
} from './state/techs-type.selectors';
import * as techTypeActions from './state/techs-type.actions';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-tech-type-crud',
  templateUrl: './tech-type-crud.component.html',
  styleUrls: ['./tech-type-crud.component.scss'],
})
export class TechTypeCrudComponent implements OnInit, OnDestroy {
  cols: DynamicTableColumnModel[] = [
    {
      header: 'ID',
      field: 'id',
    } as DynamicTableColumnModel,
    {
      header: 'Nombre',
      field: 'name',
    } as DynamicTableColumnModel,
  ];

  values$!: Observable<TipoTecnologia[]>;
  valuesLoading$!: Observable<boolean>;

  onCloseSub$: Subscription = this.ref.onClose.subscribe(() =>
    this.store.dispatch(techTypeActions.closeTechsTypes())
  );

  constructor(private store: Store, public ref: DynamicDialogRef) {}

  ngOnInit(): void {
    this.values$ = this.store.select(selectTechTypes);
    this.valuesLoading$ = this.store.select(selectTechTypesLoading);
  }

  ngOnDestroy(): void {
    this.onCloseSub$.unsubscribe();
  }

  lazyLoadEvent(query: LazyLoadEvent) {
    this.store.dispatch(techTypeActions.loadTechsTypes({ query }));
  }

  openForm(techType?: TipoTecnologia) {
    this.store.dispatch(techTypeActions.openTechsTypesForm({ techType }));
  }

  delete(techType: TipoTecnologia) {
    this.store.dispatch(techTypeActions.deleteTechsTypes({ techType }));
  }
}
