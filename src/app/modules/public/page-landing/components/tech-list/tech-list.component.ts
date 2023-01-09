import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Tech } from 'src/app/project/models/Tech.model';
import * as InicioSelectors from '../../state/inicio.selectors';

@Component({
  selector: 'app-tech-list',
  templateUrl: './tech-list.component.html',
  styleUrls: ['./tech-list.component.scss']
})
export class TechListComponent implements OnInit {

  @Input() title!: string;

  techs!: Observable<Tech[]>;
  techsLoading!: Observable<boolean>;

  constructor(
    private store: Store
  ){}

  ngOnInit(): void {
    this.techsLoading = this.store.select(InicioSelectors.selectTechTypesLoadingInicio);
    const techsRequest = this.store.select(InicioSelectors.selectTechsInicio);
    this.techs = techsRequest.pipe(
      map((value) => value.data as Tech[])
    );
  }

}
