import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicTableColumnModel } from 'src/app/components/ui-dynamic-table/ui-dynamic-table.component';
import { Education } from 'src/app/project/models/Education.model';
import {
  appStateTypes,
  StateService,
} from 'src/app/project/services/state.service';
import { CrudComponent } from 'src/core/classes/crud-component';

@Component({
  selector: 'app-education-crud',
  templateUrl: './education-crud.component.html',
  styleUrls: ['./education-crud.component.scss'],
})
export class EducationCrudComponent
  extends CrudComponent<appStateTypes>
  implements OnInit, OnDestroy
{
  constructor(
    private stateService: StateService,
    store: Store,
    ref: DynamicDialogRef
  ) {
    super(store, ref, stateService.getState('Education'));
  }

  ngOnInit(): void {
    this.cols = [
      {
        header: 'ID',
        field: 'id',
      } as DynamicTableColumnModel,
      {
        header: 'Lugar',
        field: 'place',
        pipe: 'object',
        pipeArgs: ['name'],
      } as DynamicTableColumnModel,
      {
        header: 'Fecha Inicio',
        field: 'startDate',
        pipe: 'date',
        pipeArgs: ['d MMM y'],
      } as DynamicTableColumnModel,
      {
        header: 'Fecha Fin',
        field: 'finishDate',
        pipe: 'date',
        pipeArgs: ['d MMM y'],
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

  openForm(value?: Education) {
    this.store.dispatch(this.state.actions.openCrudForm({ value }));
  }

  delete(value: Education) {
    this.store.dispatch(this.state.actions.deleteValue({ value }));
  }
}
