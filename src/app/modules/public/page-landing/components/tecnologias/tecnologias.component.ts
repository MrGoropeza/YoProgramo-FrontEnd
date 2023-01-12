import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SelectItem, SelectItemGroup } from 'primeng/api';
import { Observable } from 'rxjs';
import * as InicioSelectors from '../../state/inicio.selectors';
import { Tech } from 'src/app/project/models/Tech.model';
@Component({
  selector: 'app-tecnologias',
  templateUrl: './tecnologias.component.html',
  styleUrls: ['./tecnologias.component.scss'],
})
export class TecnologiasComponent implements OnInit {
  techsGroup$!: Observable<SelectItemGroup[]>;
  techsLoading$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.techsGroup$ = this.store.select(InicioSelectors.selectTechsInicio);
    this.techsLoading$ = this.store.select(InicioSelectors.selectAboutLoading);
  }

  selectGrouptoTechList(items: SelectItem<Tech>[]) {
    return items.map((item) => item.value);
  }
}
