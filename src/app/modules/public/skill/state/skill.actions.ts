import { createAction, props } from '@ngrx/store';
import { Skill } from 'src/app/project/models/Skill.model';

export const loadSkills = createAction(
  '[SkillPage] Load Skills'
);

export const loadSkillsSuccess = createAction(
  '[SkillPage] Load Skills Success',
  props<{ data: Skill[] }>()
);

export const loadSkillsFailure = createAction(
  '[SkillPage] Load Skills Failure',
  props<{ error: unknown }>()
);
