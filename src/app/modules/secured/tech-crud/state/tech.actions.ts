import { createAction, props } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';

export const openTechsCrud = createAction('[Techs] Open TechsCrud');

export const closeTechsCrud = createAction('[Techs] Close TechsCrud');

export const loadTechsCrud = createAction(
  '[Techs] Load TechsCrud',
  props<{ query?: LazyLoadEvent }>()
);


export const loadTechsCrudSuccess = createAction(
  '[Techs] Load TechsCrud Success'
);

export const loadTechsCrudFailure = createAction(
  '[Techs] Load TechsCrud Failure',
  props<{ error: any }>()
);
