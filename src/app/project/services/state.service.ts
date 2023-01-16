/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { CrudState } from 'src/core/classes/crud-state/crud.reducer';
import { TechType } from '../models/TechType.model';
import { Tech } from '../models/Tech.model';
import { Store } from '@ngrx/store';
import { Place } from '../models/Place.model';
import { Person } from '../models/Person.model';
import { Experience } from '../models/Experience.model';
import { Education } from '../models/Education.model';
import { Skill } from '../models/Skill.model';
import { Project } from '../models/Project.model';
import { User } from '../models/User.model';

export type appStateTypes =
  | Tech
  | TechType
  | Place
  | Person
  | Experience
  | Education
  | Skill
  | Person
  | Project
  | User;
export type appStateNames =
  | 'Tech'
  | 'TechType'
  | 'Place'
  | 'About'
  | 'Experience'
  | 'Education'
  | 'Skill'
  | 'Person'
  | 'Project'
  | 'Auth';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private appStates: CrudState<appStateTypes>[] = [
    new CrudState<appStateTypes>('TechType'),
    new CrudState<appStateTypes>('Tech'),
    new CrudState<appStateTypes>('Place'),
    new CrudState<appStateTypes>('About'),
    new CrudState<appStateTypes>('Experience'),
    new CrudState<appStateTypes>('Education'),
    new CrudState<appStateTypes>('Skill'),
    new CrudState<appStateTypes>('Person'),
    new CrudState<appStateTypes>('Project'),
    new CrudState<appStateTypes>('Auth'),
  ];

  constructor(private store: Store) {
    this.appStates.forEach((state) =>
      store.addReducer(state.modelName, state.modelReducer)
    );
  }

  getState(modelName: appStateNames) {
    return this.appStates.find((value) => value.modelName === modelName)!;
  }
}
