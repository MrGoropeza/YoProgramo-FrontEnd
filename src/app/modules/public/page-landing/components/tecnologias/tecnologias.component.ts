import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { TechModel } from 'src/app/project/models/tech.model';
import {
  selectBackendTechs,
  selectFrontendTechs,
} from '../../selectors/inicio.selectors';

@Component({
  selector: 'app-tecnologias',
  templateUrl: './tecnologias.component.html',
  styleUrls: ['./tecnologias.component.scss'],
})
export class TecnologiasComponent implements OnInit {
  tabs: MenuItem[] = [
    {
      label: 'FrontEnd',
    },
    {
      label: 'BackEnd',
    },
  ];

  frontTechs$!: Observable<TechModel[]>;
  backTechs$!: Observable<TechModel[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.frontTechs$ = this.store.select(selectFrontendTechs);
    this.backTechs$ = this.store.select(selectBackendTechs);
  }
}
