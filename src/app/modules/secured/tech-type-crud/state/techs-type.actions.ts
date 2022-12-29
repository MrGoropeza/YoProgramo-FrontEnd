import { createAction, props } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { TipoTecnologia } from 'src/app/project/models/tech.model';

export const openTechsTypes = createAction('[TechsType] Open TechsTypes');
export const closeTechsTypes = createAction('[TechsType] Close TechsTypes');

export const loadTechsTypes = createAction(
  '[TechsType] Load TechsTypes',
  props<{ query?: LazyLoadEvent }>()
);

export const loadTechsTypesSuccess = createAction(
  '[TechsType] Load TechsTypes Success',
  props<{ data: TipoTecnologia[] }>()
);

export const loadTechsTypesFailure = createAction(
  '[TechsType] Load TechsTypes Failure',
  props<{ error: any }>()
);
