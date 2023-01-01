import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { DynamicTableColumnModel } from 'src/core/classes/dynamic-table.model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrudComponent } from 'src/core/classes/crud-component';
import { TechType } from 'src/app/project/models/TechType.model';
import { appStateTypes, StateService } from 'src/app/project/services/state.service';

@Component({
  selector: 'app-tech-type-crud',
  templateUrl: './tech-type-crud.component.html',
  styleUrls: ['./tech-type-crud.component.scss'],
})
export default class TechTypeCrudComponent
  extends CrudComponent<appStateTypes>
  implements OnInit, OnDestroy
{
  constructor(
    private stateService: StateService,
    store: Store,
    ref: DynamicDialogRef
  ) {
    super(store, ref, stateService.getState('TechType'));
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
    this.store.dispatch(
      this.state.actions.loadValues({
        query,
      })
    );
  }

  openForm(techType?: TechType) {
    this.store.dispatch(this.state.actions.openCrudForm({ value: techType }));
  }

  delete(techType: TechType) {
    this.store.dispatch(
      this.state.actions.deleteValue({
        value: techType,
      })
    );
  }
}
