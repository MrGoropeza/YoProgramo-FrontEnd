import { createAction, props } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { MultipleRecordsResponse } from 'src/app/project/models/MultipleRecordsResponse';
import { TechType } from 'src/app/project/models/TechType.model';

export const openTechsTypes = createAction('[TechsType] Open TechsTypes');
export const closeTechsTypes = createAction('[TechsType] Close TechsTypes');

export const openTechsTypesForm = createAction(
  '[TechsType] Open TechsTypesForm',
  props<{ techType?: TechType }>()
);

export const loadTechsTypes = createAction(
  '[TechsType] Load TechsTypes',
  props<{ query?: LazyLoadEvent }>()
);

export const loadTechsTypesSuccess = createAction(
  '[TechsType] Load TechsTypes Success',
  props<{ data: MultipleRecordsResponse<TechType> }>()
);

export const loadTechsTypesFailure = createAction(
  '[TechsType] Load TechsTypes Failure',
  props<{ error: any }>()
);

export const saveTechsTypes = createAction(
  '[TechsType] Save TechsTypes',
  props<{ techType: TechType }>()
);

export const saveTechsTypesSuccess = createAction(
  '[TechsType] Save TechsTypes Success'
);

export const saveTechsTypesFailure = createAction(
  '[TechsType] Save TechsTypes Failure',
  props<{ error: any }>()
);

export const deleteTechsTypes = createAction(
  '[TechsType] Delete TechsTypes',
  props<{ techType: TechType }>()
);

export const deleteTechsTypesSuccess = createAction(
  '[TechsType] Delete TechsTypes Success',
);

export const deleteTechsTypesFailure = createAction(
  '[TechsType] Delete TechsTypes Failure',
  props<{ error: any }>()
);
