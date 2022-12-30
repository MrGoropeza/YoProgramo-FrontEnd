import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { TipoTecnologia } from 'src/app/project/models/tech.model';
import { DynamicTableColumnModel } from 'src/core/classes/dynamic-table.model';
import * as techTypeActions from './state/techs-type.actions';
import * as techTypeSelectors from './state/techs-type.selectors';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrudComponent } from 'src/core/classes/crud-component';

@Component({
  selector: 'app-tech-type-crud',
  templateUrl: './tech-type-crud.component.html',
  styleUrls: ['./tech-type-crud.component.scss'],
})
export default class TechTypeCrudComponent
  extends CrudComponent<TipoTecnologia>
  implements OnInit, OnDestroy
{
  constructor(store: Store, ref: DynamicDialogRef) {
    super(
      store,
      ref,
      techTypeActions.closeTechsTypes(),
      techTypeSelectors.selectTechTypes,
      techTypeSelectors.selectTechTypesLoading
    );
  }

  ngOnInit(): void {
    this.cols = [
      {
        header: 'ID',
        field: 'id',
      } as DynamicTableColumnModel,
      {
        header: 'Nombre',
        field: 'name',
      } as DynamicTableColumnModel,
    ];
    this.init();
  }

  ngOnDestroy(): void {
    this.destroy();
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
