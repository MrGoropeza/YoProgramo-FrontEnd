import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import * as InicioSelectors from '../../state/inicio.selectors';
import * as InicioActions from '../../state/inicio.actions';
import { appStateTypes } from 'src/app/project/services/state.service';
import { MultipleRecordsResponse } from 'src/app/project/models/MultipleRecordsResponse';
import { TechType } from 'src/app/project/models/TechType.model';
@Component({
  selector: 'app-tecnologias',
  templateUrl: './tecnologias.component.html',
  styleUrls: ['./tecnologias.component.scss'],
})
export class TecnologiasComponent implements OnInit {
  techTypes$!: Observable<MultipleRecordsResponse<appStateTypes>>;
  techTypesLoading$!: Observable<boolean>;
  techs$!: Observable<MultipleRecordsResponse<appStateTypes>>;
  techsLoading$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.techTypes$ = this.store.select(InicioSelectors.selectTechTypesInicio);
    this.techTypesLoading$ = this.store.select(InicioSelectors.selectTechTypesLoadingInicio);
    this.techs$ = this.store.select(InicioSelectors.selectTechsInicio);
    this.techsLoading$ = this.store.select(InicioSelectors.selectTechsLoadingInicio);
  }

  firstTime = true;

  techTypesToMenuItem(techTypes: appStateTypes[]): MenuItem[] {
    return techTypes.map((techType) => {
      let label = (techType as TechType).name;
      return ({ label })
    }
    );
  }

  loadTechs(activeType: MenuItem) {
    this.firstTime = false;
    if (activeType.label) {
      this.store.dispatch(InicioActions.loadTechs({ activeType: activeType.label }));
    }
  }
}
