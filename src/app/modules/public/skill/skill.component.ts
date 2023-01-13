import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Skill } from 'src/app/project/models/Skill.model';

import * as actions from './state/skill.actions';
import * as selectors from './state/skill.selectors';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
})
export class SkillComponent implements OnInit {
  values!: Observable<Skill[]>;
  valuesLoading!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(actions.loadSkills());
    this.values = this.store.select(selectors.selectSkills);
    this.valuesLoading = this.store.select(selectors.selectSkillsLoading);
  }
}
