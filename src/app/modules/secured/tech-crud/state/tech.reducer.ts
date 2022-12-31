import { Action, createReducer, on } from '@ngrx/store';
import { MultipleRecordsResponse } from 'src/app/project/models/MultipleRecordsResponse';
import { Tech } from 'src/app/project/models/Tech.model';
import * as actions from './tech.actions';


export const techFeatureKey = 'techs';

export interface TechState {
  techs: MultipleRecordsResponse<Tech>;
  techsError: any;
  techsLoading: boolean;
  techOperationState: string;
  techSaveError: any;
  techDeleteError: any;
}

export const initialState: TechState = {
  techs: {data: [], totalRecords: 0},
  techsError: undefined,
  techsLoading: false,
  techOperationState: '',
  techSaveError: undefined,
  techDeleteError: undefined
};

export const techReducer = createReducer<TechState>(
  initialState,
  on(
    actions.loadTechs,
    (state): TechState => ({...state, techsLoading: true})
  ),
  on(
    actions.loadTechsSuccess,
    (state, action): TechState => ({...state, techs: action.data, techsLoading: false})
  ),
  on(
    actions.loadTechsFailure,
    (state, action): TechState => ({...state, techsError: action.error, techsLoading: false})
  ),
  on(
    actions.saveTechs,
    (state): TechState => ({...state, techOperationState: "loading"})
  ),
  on(
    actions.saveTechsSuccess,
    (state): TechState => ({...state, techOperationState: "success"})
  ),
  on(
    actions.saveTechsFailure,
    (state, action): TechState => ({...state, techOperationState: "error", techSaveError: action.error})
  ),
  on(
    actions.deleteTechsFailure,
    (state, action): TechState => ({...state, techDeleteError: action.error})
  ),
);
