import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as reducer from './skill.reducer';

export const selectSkillState = createFeatureSelector<reducer.SkillState>(
  reducer.skillFeatureKey
);

export const selectSkills = createSelector(
  selectSkillState,
  (state) => state.skills
);

export const selectSkillsLoading = createSelector(
  selectSkillState,
  (state) => state.skillsLoading
);
