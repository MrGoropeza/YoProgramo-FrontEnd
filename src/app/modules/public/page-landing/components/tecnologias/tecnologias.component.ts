import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import * as InicioSelectors from '../../state/inicio.selectors';
import * as InicioActions from '../../state/inicio.actions';
import { appStateTypes } from 'src/app/project/services/state.service';
import { MultipleRecordsResponse } from 'src/app/project/models/MultipleRecordsResponse';
@Component({
  selector: 'app-tecnologias',
  templateUrl: './tecnologias.component.html',
  styleUrls: ['./tecnologias.component.scss'],
})
export class TecnologiasComponent implements OnInit {
  techTypes$!: Observable<MultipleRecordsResponse<appStateTypes>>;
  techs$!: Observable<MultipleRecordsResponse<appStateTypes>>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.techTypes$ = this.store.select(InicioSelectors.selectTechTypesInicio);
    this.techs$ = this.store.select(InicioSelectors.selectTechsInicio);
  }

  firstTime = true;

  techTypesToMenuItem(techTypes: appStateTypes[]): MenuItem[] {
    return techTypes.map((techType) => ({ label: techType.name }));
  }

  loadTechs(activeType: MenuItem) {
    this.firstTime = false;
    if (activeType.label) {
      this.store.dispatch(InicioActions.loadTechs({ activeType: activeType.label }));
    }
  }
}
