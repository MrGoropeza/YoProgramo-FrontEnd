import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Experience } from 'src/app/project/models/Experience.model';

import * as expActions from './state/exp.actions';
import * as expSelectors from './state/exp.selectors';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss']
})
export class ExperienciaComponent implements OnInit {

  experiences!: Observable<Experience[]>;
  experiencesLoading!: Observable<boolean>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(expActions.loadExps());
    this.experiences = this.store.select(expSelectors.selectExperiences);
    this.experiencesLoading = this.store.select(expSelectors.selectExperiencesLoading);
  }

}
