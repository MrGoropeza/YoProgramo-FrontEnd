import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { TipoTecnologia } from 'src/app/project/models/tech.model';
import { DynamicTableColumnModel } from 'src/core/classes/dynamic-table.model';
import { selectTechTypes, selectTechTypesLoading } from './state/techs-type.selectors';
import * as techTypeActions from './state/techs-type.actions';

@Component({
  selector: 'app-tech-type-crud',
  templateUrl: './tech-type-crud.component.html',
  styleUrls: ['./tech-type-crud.component.scss']
})
export class TechTypeCrudComponent implements OnInit {

  cols: DynamicTableColumnModel[] = [
    {
      header: "ID",
      field: "id"
    } as DynamicTableColumnModel,
    {
      header: "Nombre",
      field: "name"
    } as DynamicTableColumnModel,
  ];

  values$!: Observable<TipoTecnologia[]>;
  valuesLoading$!: Observable<boolean>;

  constructor(
    private store: Store
  ){}

  ngOnInit(): void {
    this.values$ = this.store.select(selectTechTypes);
    this.valuesLoading$ = this.store.select(selectTechTypesLoading);
  }

  lazyLoadEvent(query: LazyLoadEvent){
    this.store.dispatch(techTypeActions.loadTechsTypes({query}));
  }

  openForm(techType?: TipoTecnologia){
    this.store.dispatch(techTypeActions.openTechsTypesForm({ techType }));
  }

  delete(techType: TipoTecnologia){
    this.store.dispatch(techTypeActions.deleteTechsTypes({techType}));
  }

}
