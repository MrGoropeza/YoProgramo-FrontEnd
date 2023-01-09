import { createAction, props } from '@ngrx/store';
import { Education } from 'src/app/project/models/Education.model';

export const loadEducations = createAction(
  '[Education] Load Educations'
);

export const loadEducationsSuccess = createAction(
  '[Education] Load Educations Success',
  props<{ data: Education[] }>()
);

export const loadEducationsFailure = createAction(
  '[Education] Load Educations Failure',
  props<{ error: unknown }>()
);
