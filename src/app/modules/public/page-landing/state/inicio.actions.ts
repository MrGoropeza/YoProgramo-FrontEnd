import { createAction, props } from '@ngrx/store';
import { Person } from 'src/app/project/models/Person.model';

export const loadAboutmes = createAction(
  '[Aboutme] Load Aboutmes'
);

export const loadAboutmesSuccess = createAction(
  '[Aboutme] Load Aboutmes Success',
  props<{ data: Person }>()
);

export const loadAboutmesFailure = createAction(
  '[Aboutme] Load Aboutmes Failure',
  props<{ error: unknown }>()
);
