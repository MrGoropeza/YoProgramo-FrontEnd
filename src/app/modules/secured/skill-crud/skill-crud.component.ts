import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicTableColumnModel } from 'src/app/components/ui-dynamic-table/ui-dynamic-table.component';
import { Skill } from 'src/app/project/models/Skill.model';
import {
  appStateTypes,
  StateService,
} from 'src/app/project/services/state.service';
import { CrudComponent } from 'src/core/classes/crud-component';

@Component({
  selector: 'app-skill-crud',
  templateUrl: './skill-crud.component.html',
  styleUrls: ['./skill-crud.component.scss'],
})
export class SkillCrudComponent
  extends CrudComponent<appStateTypes>
  implements OnInit, OnDestroy
{
  constructor(
    private stateService: StateService,
    store: Store,
    ref: DynamicDialogRef
  ) {
    super(store, ref, stateService.getState('Skill'));
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
        header: 'Valor',
        field: 'value',
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

  openForm(value?: Skill) {
    this.store.dispatch(this.state.actions.openCrudForm({ value }));
  }

  delete(value: Skill) {
    this.store.dispatch(this.state.actions.deleteValue({ value }));
  }
}
