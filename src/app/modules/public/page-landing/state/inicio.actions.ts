import { createAction, props } from '@ngrx/store';
import { Tecnologia, TipoTecnologia } from 'src/app/project/models/tech.model';

export const loadInicios = createAction('[Inicio] Load Inicios');

export const loadIniciosSuccess = createAction('[Inicio] Load Inicios Success');

export const loadIniciosFailure = createAction(
  '[Inicio] Load Inicios Failure',
  props<{ error: any }>()
);

export const loadTechsTypes = createAction(
  '[Inicio] Load TechsTypes',
);

export const loadTechsTypesSuccess = createAction(
  '[Inicio] Load TechsTypes Success',
  props<{ data: TipoTecnologia[] }>()
);

export const loadTechsTypesFailure = createAction(
  '[Inicio] Load TechsTypes Failure',
  props<{ error: any }>()
);


export const loadTechs = createAction(
  '[Inicio] Load Techs',
  props<{ activeType: string }>()
);

export const loadTechsSuccess = createAction(
  '[Inicio] Load Techs Success',
  props<{ data: Tecnologia[] }>()
);

export const loadTechsFailure = createAction(
  '[Inicio] Load Techs Failure',
  props<{ error: any }>()
);
