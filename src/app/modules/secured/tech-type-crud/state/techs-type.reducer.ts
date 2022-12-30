import { Action, createReducer, on } from '@ngrx/store';
import { MultipleRecordsResponse } from 'src/app/project/models/MultipleRecordsResponse';
import { TechType } from 'src/app/project/models/TechType.model';
import * as actions from './techs-type.actions';


export const techsTypeFeatureKey = 'techsType';

export interface TechTypeCrudState {
  techTypes: MultipleRecordsResponse<TechType>;
  techTypesError: any;
  techTypesLoading: boolean;
  techTypeOperationState: string;
  techTypeSaveError: any;
  techTypeDeleteError: any;
}

export const initialState: TechTypeCrudState = {
  techTypes: {data: [], totalRecords: 0},
  techTypesError: undefined,
  techTypesLoading: false,
  techTypeOperationState: '',
  techTypeSaveError: undefined,
  techTypeDeleteError: undefined
};

export const techTypeCrudReducer = createReducer<TechTypeCrudState>(
  initialState,
  on(
    actions.loadTechsTypes,
    (state): TechTypeCrudState => ({...state, techTypesLoading: true})
  ),
  on(
    actions.loadTechsTypesSuccess,
    (state, action): TechTypeCrudState => ({...state, techTypes: action.data, techTypesLoading: false})
  ),
  on(
    actions.loadTechsTypesFailure,
    (state, action): TechTypeCrudState => ({...state, techTypesError: action.error, techTypesLoading: false})
  ),
  on(
    actions.saveTechsTypes,
    (state): TechTypeCrudState => ({...state, techTypeOperationState: "loading"})
  ),
  on(
    actions.saveTechsTypesSuccess,
    (state): TechTypeCrudState => ({...state, techTypeOperationState: "success"})
  ),
  on(
    actions.saveTechsTypesFailure,
    (state, action): TechTypeCrudState => ({...state, techTypeOperationState: "error", techTypeSaveError: action.error})
  ),
  on(
    actions.deleteTechsTypesFailure,
    (state, action): TechTypeCrudState => ({...state, techTypeDeleteError: action.error})
  ),
);
