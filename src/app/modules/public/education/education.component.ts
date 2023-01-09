import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Education } from 'src/app/project/models/Education.model';

import * as educationActions from './state/education.actions';
import * as educationSelectors from './state/education.selectors';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  values!: Observable<Education[]>;
  valuesLoading!: Observable<boolean>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(educationActions.loadEducations());
    this.values = this.store.select(educationSelectors.selectEducations);
    this.valuesLoading = this.store.select(educationSelectors.selectEducationsLoading);
  }

}
