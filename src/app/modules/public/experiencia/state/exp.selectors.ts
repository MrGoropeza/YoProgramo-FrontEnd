import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as reducer from './exp.reducer';

export const selectInicioState = createFeatureSelector<reducer.ExpState>(
  reducer.expFeatureKey
);

export const selectExperiences = createSelector(
  selectInicioState,
  (state) => state.experiences
);

export const selectExperiencesLoading = createSelector(
  selectInicioState,
  (state) => state.experiencesLoading
);
