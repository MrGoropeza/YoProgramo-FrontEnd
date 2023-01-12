import { createAction, props } from '@ngrx/store';
import { Skill } from 'src/app/project/models/Skill.model';

export const loadSkills = createAction(
  '[Skill] Load Skills'
);

export const loadSkillsSuccess = createAction(
  '[Skill] Load Skills Success',
  props<{ data: Skill[] }>()
);

export const loadSkillsFailure = createAction(
  '[Skill] Load Skills Failure',
  props<{ error: unknown }>()
);
