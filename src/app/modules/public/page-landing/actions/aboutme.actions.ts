import { createAction, props } from '@ngrx/store';
import { AboutModel } from 'src/app/project/models/about.model';

export const loadAboutmes = createAction(
  '[Aboutme] Load Aboutmes'
);

export const loadAboutmesSuccess = createAction(
  '[Aboutme] Load Aboutmes Success',
  props<{ data: AboutModel }>()
);

export const loadAboutmesFailure = createAction(
  '[Aboutme] Load Aboutmes Failure',
  props<{ error: any }>()
);
