import { Action, createReducer, on } from '@ngrx/store';
import { TipoTecnologia } from 'src/app/project/models/tech.model';
import { loadTechsTypesFailure, loadTechsTypesSuccess, loadTechsTypes } from './techs-type.actions';


export const techsTypeFeatureKey = 'techsType';

export interface TechTypeCrudState {
  techTypes: TipoTecnologia[];
  techTypesError: any;
  techTypesLoading: boolean;
}

export const initialState: TechTypeCrudState = {
  techTypes: [],
  techTypesError: undefined,
  techTypesLoading: false,
};

export const techTypeCrudReducer = createReducer<TechTypeCrudState>(
  initialState,
  on(
    loadTechsTypes,
    (state): TechTypeCrudState => ({...state, techTypesLoading: true})
  ),
  on(
    loadTechsTypesSuccess,
    (state, action): TechTypeCrudState => ({...state, techTypes: action.data, techTypesLoading: false})
  ),
  on(
    loadTechsTypesFailure,
    (state, action): TechTypeCrudState => ({...state, techTypesError: action.error, techTypesLoading: false})
  ),
);
