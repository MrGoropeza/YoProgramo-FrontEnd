import { createReducer, on } from '@ngrx/store';
import { Skill } from 'src/app/project/models/Skill.model';

import * as actions from './skill.actions';

export const skillFeatureKey = 'skill';

export interface SkillState {
  skills: Skill[];
  skillsLoading: boolean;
  skillsError: unknown;
}

export const initialState: SkillState = {
  skills: [],
  skillsLoading: false,
  skillsError: undefined
};

export const reducer = createReducer(
  initialState,
  on(
    actions.loadSkills,
    (state): SkillState => ({ ...state, skills: [], skillsLoading: true })
  ),
  on(
    actions.loadSkillsSuccess,
    (state, action): SkillState => ({ ...state, skills: action.data, skillsLoading: false })
  ),
  on(
    actions.loadSkillsFailure,
    (state, action): SkillState => ({ ...state, skillsError: action.error, skillsLoading: false })
  )
);
