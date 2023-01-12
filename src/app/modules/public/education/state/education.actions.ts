import { createAction, props } from '@ngrx/store';
import { Education } from 'src/app/project/models/Education.model';

export const loadEducations = createAction(
  '[EducationPage] Load Educations'
);

export const loadEducationsSuccess = createAction(
  '[EducationPage] Load Educations Success',
  props<{ data: Education[] }>()
);

export const loadEducationsFailure = createAction(
  '[EducationPage] Load Educations Failure',
  props<{ error: unknown }>()
);
