import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Tech } from 'src/app/project/models/Tech.model';
import { CrudComponent } from 'src/core/classes/crud-component';
import { DynamicTableColumnModel } from 'src/core/classes/dynamic-table.model';
import * as techActions from './state/tech.actions';
import * as techSelectors from './state/tech.selectors';

@Component({
  selector: 'app-tech-crud',
  templateUrl: './tech-crud.component.html',
  styleUrls: ['./tech-crud.component.scss']
})
export class TechCrudComponent extends CrudComponent<Tech> implements OnInit, OnDestroy {

  @Input() modalVisible = false;

  constructor(
    store: Store,
    ref: DynamicDialogRef,
  ){
    super(
      store,
      ref,
      techActions.closeTechs(),
      techSelectors.selectTechs,
      techSelectors.selectTechsLoading
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
      {
        header: 'Descripción',
        field: 'description',
      } as DynamicTableColumnModel,
      {
        header: 'Tipo',
        field: 'tipo',
        pipe: 'object',
        pipeArgs: ['name']
      } as DynamicTableColumnModel,
    ];
    this.init();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  lazyLoadEvent(query: LazyLoadEvent) {
    this.store.dispatch(techActions.loadTechs({ query }));
  }

  openForm(tech?: Tech) {
    this.store.dispatch(techActions.openTechsForm({ tech }));
  }

  delete(tech: Tech) {
    this.store.dispatch(techActions.deleteTechs({ tech }));
  }

}
