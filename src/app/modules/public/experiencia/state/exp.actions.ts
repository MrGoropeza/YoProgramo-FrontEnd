import { createAction, props } from '@ngrx/store';
import { Experience } from 'src/app/project/models/Experience.model';

export const loadExps = createAction(
  '[Exp] Load Exps'
);

export const loadExpsSuccess = createAction(
  '[Exp] Load Exps Success',
  props<{ data: Experience[] }>()
);

export const loadExpsFailure = createAction(
  '[Exp] Load Exps Failure',
  props<{ error: unknown }>()
);
