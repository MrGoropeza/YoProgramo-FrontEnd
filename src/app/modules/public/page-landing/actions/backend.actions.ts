import { createAction, props } from '@ngrx/store';
import { TechModel } from 'src/app/project/models/tech.model';

export const loadBackends = createAction(
  '[Backend] Load Backends'
);

export const loadBackendsSuccess = createAction(
  '[Backend] Load Backends Success',
  props<{ data: TechModel[] }>()
);

export const loadBackendsFailure = createAction(
  '[Backend] Load Backends Failure',
  props<{ error: any }>()
);
