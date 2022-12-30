import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { Tech } from 'src/app/project/models/Tech.model';
import { loadTechs, loadTechsTypes } from '../../state/inicio.actions';
import { openTechsTypes } from '../../../../secured/tech-type-crud/state/techs-type.actions';
import {
  selectTechsInicio,
  selectTechTypesInicio,
} from '../../state/inicio.selectors';
import { openTechs } from 'src/app/modules/secured/tech-crud/state/tech.actions';
import { TechType } from 'src/app/project/models/TechType.model';
@Component({
  selector: 'app-tecnologias',
  templateUrl: './tecnologias.component.html',
  styleUrls: ['./tecnologias.component.scss'],
})
export class TecnologiasComponent implements OnInit {
  techTypes$!: Observable<TechType[]>;
  techs$!: Observable<Tech[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    const response$ = this.store.select(selectTechTypesInicio);
    this.techTypes$ = response$.pipe(map((value) => value.data));
    this.techs$ = this.store.select(selectTechsInicio);
  }

  firstTime = true;

  techTypesToMenuItem(techTypes: TechType[]): MenuItem[] {
    return techTypes.map((techType) => ({ label: techType.name }));
  }

  editTechsClick() {
    this.store.dispatch(openTechs());
  }

  editTypesClick() {
    this.store.dispatch(openTechsTypes());
  }

  loadTechs(activeType: MenuItem) {
    this.firstTime = false;
    if (activeType.label) {
      this.store.dispatch(loadTechs({ activeType: activeType.label }));
    }
  }
}
