import { createReducer, on } from '@ngrx/store';
import { Experience } from 'src/app/project/models/Experience.model';

import * as actions from './exp.actions';

export const expFeatureKey = 'exp';

export interface ExpState {
  experiences: Experience[];
  experiencesLoading: boolean;
  experiencesError: unknown;
}

export const initialState: ExpState = {
  experiences: [],
  experiencesLoading: false,
  experiencesError: undefined,
};

export const reducer = createReducer(
  initialState,
  on(
    actions.loadExps,
    (state): ExpState => ({ ...state, experiencesLoading: true })
  ),
  on(
    actions.loadExpsSuccess,
    (state, action): ExpState => ({ ...state, experiences: action.data, experiencesLoading: false })
  ),
  on(
    actions.loadExpsFailure,
    (state, action): ExpState => ({ ...state, experiencesError: action.error, experiencesLoading: false })
  )
);
