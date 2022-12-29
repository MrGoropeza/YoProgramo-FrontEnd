import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { TechModel, TipoTecnologia } from 'src/app/project/models/tech.model';
import { loadTechs } from '../../actions/inicio.actions';
import { loadTechsEdits } from '../../actions/techs-edit.actions';
import { openTechsTypes } from '../../actions/techs-type.actions';
import { selectTechsInicio } from '../../selectors/inicio.selectors';
import { selectTechCrudModalState } from '../../selectors/tech-edit.selectors';
import {
  selectTechTypeCrudModalState,
  selectTechTypes,
} from '../../selectors/tech-type.selectors';

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
    this.techTypes$ = this.store.select(selectTechTypes);
    this.techs$ = this.store.select(selectTechsInicio);
  }

  techTypesToMenuItem(techTypes: TipoTecnologia[]): MenuItem[] {
    return techTypes.map((techType) => ({ label: techType.name }));
  }

  editTechsClick() {
    this.store.dispatch(loadTechsEdits());
  }

  editTypesClick() {
    this.store.dispatch(openTechsTypes());
  }

  loadTechs(activeType: string) {
    this.store.dispatch(loadTechs({ activeType }));
  }
}
