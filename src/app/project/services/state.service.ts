/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { CrudState } from 'src/core/classes/crud-state/crud.reducer';
import { TechType } from '../models/TechType.model';
import { Tech } from '../models/Tech.model';
import { Store } from '@ngrx/store';
import { Place } from '../models/place.model';
import { Person } from '../models/about.model';

export type appStateTypes = Tech | TechType | Place | Person;
export type appStateNames = "Tech" | "TechType" | "Place" | "About";

@Injectable({
  providedIn: 'root',
})
export class StateService {
  appStates: CrudState<appStateTypes>[] = [
    new CrudState<appStateTypes>('TechType'),
    new CrudState<appStateTypes>('Tech'),
    new CrudState<appStateTypes>('Place'),
    new CrudState<appStateTypes>('About')
  ];

  constructor(private store: Store) {
    this.appStates.forEach((state) => {
      store.addReducer(state.modelName, state.modelReducer);
      this.appStates.push(state);
      console.log(`${state.modelName} - Registrado en el Store`);
    });
  }

  getState(modelName: appStateNames) {
    return this.appStates.find((value) => value.modelName === modelName)!;
  }
}
