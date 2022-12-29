import { Action, createReducer, on } from '@ngrx/store';
import { closeTechsCrud, loadTechsCrudFailure, loadTechsCrudSuccess, openTechsCrud } from './tech.actions';


export const techsEditFeatureKey = 'techsCrud';

export interface TechCrudState {
  modalLoading: boolean;
  modalVisible: boolean;
  modalLoadingError: any;
}

export const initialState: TechCrudState = {
  modalLoading: false,
  modalVisible: false,
  modalLoadingError: undefined,
};

export const techCrudReducer = createReducer<TechCrudState>(
  initialState,
  on(
    openTechsCrud,
    (state): TechCrudState => ({...state, modalVisible: true})
  ),
  on(
    closeTechsCrud,
    (state): TechCrudState => ({...state, modalVisible: false})
  ),
  on(
    loadTechsCrudSuccess,
    (state): TechCrudState => ({...state, modalLoading: false, modalVisible: true})
  ),
  on(
    loadTechsCrudFailure,
    (state, action): TechCrudState => ({...state, modalLoading: false, modalVisible: false, modalLoadingError: action.error})
  ),
);
