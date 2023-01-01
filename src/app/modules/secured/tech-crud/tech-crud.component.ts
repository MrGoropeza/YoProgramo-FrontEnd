import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Tech } from 'src/app/project/models/Tech.model';
import { appStateTypes, StateService } from 'src/app/project/services/state.service';
import { CrudComponent } from 'src/core/classes/crud-component';
import { DynamicTableColumnModel } from 'src/core/classes/dynamic-table.model';

@Component({
  selector: 'app-tech-crud',
  templateUrl: './tech-crud.component.html',
  styleUrls: ['./tech-crud.component.scss'],
})
export class TechCrudComponent
  extends CrudComponent<appStateTypes>
  implements OnInit, OnDestroy
{
  constructor(
    private stateService: StateService,
    store: Store,
    ref: DynamicDialogRef
  ) {
    super(store, ref, stateService.getState('Tech'));
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
      {
        header: 'Descripción',
        field: 'description',
      } as DynamicTableColumnModel,
      {
        header: 'Tipo',
        field: 'tipo',
        pipe: 'object',
        pipeArgs: ['name'],
      } as DynamicTableColumnModel,
    ];
    this.init();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  lazyLoadEvent(query: LazyLoadEvent) {
    this.store.dispatch(this.state.actions.loadValues({ query }));
  }

  openForm(tech?: Tech) {
    this.store.dispatch(this.state.actions.openCrudForm({ value: tech }));
  }

  delete(tech: Tech) {
    this.store.dispatch(this.state.actions.deleteValue({ value: tech }));
  }
}
