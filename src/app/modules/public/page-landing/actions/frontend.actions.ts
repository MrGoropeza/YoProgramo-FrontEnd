import { createAction, props } from '@ngrx/store';
import { TechModel } from 'src/app/project/models/tech.model';

export const loadFrontends = createAction(
  '[Frontend] Load Frontends'
);

export const loadFrontendsSuccess = createAction(
  '[Frontend] Load Frontends Success',
  props<{ data: TechModel[] }>()
);

export const loadFrontendsFailure = createAction(
  '[Frontend] Load Frontends Failure',
  props<{ error: any }>()
);
