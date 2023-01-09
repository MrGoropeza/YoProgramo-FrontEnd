import { createReducer, on } from '@ngrx/store';
import { Education } from 'src/app/project/models/Education.model';

import * as actions from './education.actions';

export const educationFeatureKey = 'education';

export interface EducationState {
  educations: Education[];
  educationsLoading: boolean;
  educationError: unknown;
}

export const initialState: EducationState = {
  educations: [],
  educationsLoading: false,
  educationError: undefined,
};

export const reducer = createReducer(
  initialState,
  on(
    actions.loadEducations,
    (state): EducationState => ({ ...state, educations: [], educationsLoading: true })
  ),
  on(
    actions.loadEducationsSuccess,
    (state, action): EducationState => ({ ...state, educations: action.data, educationsLoading: false })
  ),
  on(
    actions.loadEducationsFailure,
    (state, action): EducationState => ({ ...state, educationError: action.error, educationsLoading: false })
  )
);
