import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicTableColumnModel } from 'src/app/components/ui-dynamic-table/ui-dynamic-table.component';
import { Project } from 'src/app/project/models/Project.model';
import { appStateTypes, StateService } from 'src/app/project/services/state.service';
import { CrudComponent } from 'src/core/classes/crud-component';

@Component({
  selector: 'app-project-crud',
  templateUrl: './project-crud.component.html',
  styleUrls: ['./project-crud.component.scss']
})
export class ProjectCrudComponent
  extends CrudComponent<appStateTypes>
  implements OnInit, OnDestroy
{

  constructor(
    private stateService: StateService,
    store: Store,
    ref: DynamicDialogRef
  ) {
    super(store, ref, stateService.getState('Project'));
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
    this.store.dispatch(this.state.actions.loadValues({ query }));
  }

  openForm(value?: Project) {
    this.store.dispatch(this.state.actions.openCrudForm({ value }));
  }

  delete(value: Project) {
    this.store.dispatch(this.state.actions.deleteValue({ value }));
  }

}
