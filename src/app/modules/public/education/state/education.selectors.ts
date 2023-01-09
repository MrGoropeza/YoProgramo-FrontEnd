import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as reducer from './education.reducer';

export const selectEducationState = createFeatureSelector<reducer.EducationState>(
  reducer.educationFeatureKey
);

export const selectEducations = createSelector(
  selectEducationState,
  (state) => state.educations
);

export const selectEducationsLoading = createSelector(
  selectEducationState,
  (state) => state.educationsLoading
);
