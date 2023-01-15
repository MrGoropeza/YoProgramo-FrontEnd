import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Project } from 'src/app/project/models/Project.model';

import * as actions from './state/project.actions';
import * as selectors from './state/project.selectors';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  values!: Observable<Project[]>;
  valuesLoading!: Observable<boolean>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(actions.loadProjects());
    this.values = this.store.select(selectors.selectProjects);
    this.valuesLoading = this.store.select(selectors.selectProjectsLoading);
  }

}
