import { createAction, props } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { MultipleRecordsResponse } from 'src/app/project/models/MultipleRecordsResponse';
import { Tech } from 'src/app/project/models/Tech.model';

export const openTechs = createAction('[Techs] Open Techs');
export const closeTechs = createAction('[Techs] Close Techs');

export const openTechsForm = createAction(
  '[Techs] Open TechsForm',
  props<{ tech?: Tech }>()
);

export const loadTechs = createAction(
  '[Techs] Load Techs',
  props<{ techTypeName?: string, query?: LazyLoadEvent }>()
);

export const loadTechsSuccess = createAction(
  '[Techs] Load Techs Success',
  props<{ data: MultipleRecordsResponse<Tech> }>()
);

export const loadTechsFailure = createAction(
  '[Techs] Load Techs Failure',
  props<{ error: any }>()
);

export const saveTechs = createAction(
  '[Techs] Save Techs',
  props<{ tech: Tech }>()
);

export const saveTechsSuccess = createAction(
  '[Techs] Save Techs Success'
);

export const saveTechsFailure = createAction(
  '[Techs] Save Techs Failure',
  props<{ error: any }>()
);

export const deleteTechs = createAction(
  '[Techs] Delete Techs',
  props<{ tech: Tech }>()
);

export const deleteTechsSuccess = createAction(
  '[Techs] Delete Techs Success',
);

export const deleteTechsFailure = createAction(
  '[Techs] Delete Techs Failure',
  props<{ error: any }>()
);
