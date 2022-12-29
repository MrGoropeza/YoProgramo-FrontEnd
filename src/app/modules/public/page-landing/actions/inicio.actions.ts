import { createAction, props } from '@ngrx/store';
import { TechModel } from 'src/app/project/models/tech.model';

export const loadInicios = createAction('[Inicio] Load Inicios');

export const loadIniciosSuccess = createAction('[Inicio] Load Inicios Success');

export const loadIniciosFailure = createAction(
  '[Inicio] Load Inicios Failure',
  props<{ error: any }>()
);

export const loadTechs = createAction(
  '[Inicio] Load Techs',
  props<{ activeType: string }>()
);

export const loadTechsSuccess = createAction(
  '[Inicio] Load Techs Success',
  props<{ data: TechModel[] }>()
);

export const loadTechsFailure = createAction(
  '[Inicio] Load Techs Failure',
  props<{ error: any }>()
);
