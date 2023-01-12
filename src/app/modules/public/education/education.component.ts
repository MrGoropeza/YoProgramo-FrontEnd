import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Education } from 'src/app/project/models/Education.model';

import * as actions from './state/education.actions';
import * as selectors from './state/education.selectors';

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
    this.store.dispatch(actions.loadEducations());
    this.values = this.store.select(selectors.selectEducations);
    this.valuesLoading = this.store.select(selectors.selectEducationsLoading);
  }

}
