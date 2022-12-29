import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { TechModel, TipoTecnologia } from 'src/app/project/models/tech.model';
import { loadTechs } from '../../state/inicio.actions';
import { openTechsTypes } from '../../../../secured/tech-type-crud/state/techs-type.actions';
import { selectTechsInicio, selectTechTypesInicio } from '../../state/inicio.selectors';
import { selectTechCrudModalState } from '../../../../secured/tech-crud/state/tech.selectors';
import {
  selectTechTypeCrudModalState,
} from '../../../../secured/tech-type-crud/state/techs-type.selectors';
import { openTechsCrud } from 'src/app/modules/secured/tech-crud/state/tech.actions';

@Component({
  selector: 'app-tecnologias',
  templateUrl: './tecnologias.component.html',
  styleUrls: ['./tecnologias.component.scss'],
})
export class TecnologiasComponent implements OnInit {
  techTypes$!: Observable<TipoTecnologia[]>;
  techs$!: Observable<TechModel[]>;

  techCrudModalVisible$!: Observable<{ visible: boolean; loading: boolean }>;
  techTypeCrudModalVisible$!: Observable<{
    visible: boolean;
    loading: boolean;
  }>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.techCrudModalVisible$ = this.store.select(selectTechCrudModalState);
    this.techTypeCrudModalVisible$ = this.store.select(
      selectTechTypeCrudModalState
    );
    this.techTypes$ = this.store.select(selectTechTypesInicio);
    this.techs$ = this.store.select(selectTechsInicio);
  }

  techTypesToMenuItem(techTypes: TipoTecnologia[]): MenuItem[] {
    return techTypes.map((techType) => ({ label: techType.name }));
  }

  editTechsClick() {
    this.store.dispatch(openTechsCrud());
  }

  editTypesClick() {
    this.store.dispatch(openTechsTypes());
  }

  loadTechs(activeType: string) {
    this.store.dispatch(loadTechs({ activeType }));
  }
}
