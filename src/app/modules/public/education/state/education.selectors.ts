import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as reducer from './education.reducer';

export const selectInicioState = createFeatureSelector<reducer.EducationState>(
  reducer.educationFeatureKey
);

export const selectEducations = createSelector(
  selectInicioState,
  (state) => state.educations
);

export const selectEducationsLoading = createSelector(
  selectInicioState,
  (state) => state.educationsLoading
);
