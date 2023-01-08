import { Component, OnDestroy, OnInit } from '@angular/core';
import { appStateTypes, StateService } from 'src/app/project/services/state.service';
import { CrudComponent } from 'src/core/classes/crud-component';
import { Store } from '@ngrx/store';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicTableColumnModel } from 'src/core/classes/dynamic-table.model';
import { LazyLoadEvent } from 'primeng/api';
import { Place } from 'src/app/project/models/Place.model';

@Component({
  selector: 'app-place-crud',
  templateUrl: './place-crud.component.html',
  styleUrls: ['./place-crud.component.scss']
})
export class PlaceCrudComponent extends CrudComponent<appStateTypes> implements OnInit, OnDestroy{

  constructor(
    private stateService: StateService,
    store: Store,
    ref: DynamicDialogRef
  ) {
    super(store, ref, stateService.getState('Place'));
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
    ];
    this.init();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  lazyLoadEvent(query: LazyLoadEvent) {
    this.store.dispatch(this.state.actions.loadValues({ query }));
  }

  openForm(place?: Place) {
    this.store.dispatch(this.state.actions.openCrudForm({ value: place }));
  }

  delete(place: Place) {
    this.store.dispatch(this.state.actions.deleteValue({ value: place }));
  }

}
