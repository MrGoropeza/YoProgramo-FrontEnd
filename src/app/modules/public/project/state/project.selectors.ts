import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as reducer from './project.reducer';

export const selectProjectState = createFeatureSelector<reducer.ProjectState>(
  reducer.projectFeatureKey
);

export const selectProjects = createSelector(
  selectProjectState,
  (state) => state.projects
);

export const selectProjectsLoading = createSelector(
  selectProjectState,
  (state) => state.projectsLoading
);
