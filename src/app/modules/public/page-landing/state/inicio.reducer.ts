import { Action, createReducer, on } from '@ngrx/store';
import { Tech } from 'src/app/project/models/Tech.model';
import * as InicioActions from './inicio.actions';
import { AboutModel } from 'src/app/project/models/about.model';
import { MultipleRecordsResponse } from 'src/app/project/models/MultipleRecordsResponse';
import { TechType } from 'src/app/project/models/TechType.model';

export const inicioFeatureKey = 'inicio';

export interface InicioState {
  techTypes: MultipleRecordsResponse<TechType>;
  techTypesError: unknown;
  techTypesLoading: boolean;
  techs: MultipleRecordsResponse<Tech>
  techsError: unknown;
  techsLoading: boolean;
  aboutMe: AboutModel;
  aboutMeError: unknown;
  aboutLoading: boolean;
}

export const initialState: InicioState = {
  techTypes: {data: [], totalRecords: 0},
  techTypesError: undefined,
  techTypesLoading: false,
  techs: {data: [], totalRecords: 0},
  techsError: undefined,
  techsLoading: false,
  aboutMe: {} as AboutModel,
  aboutMeError: {},
  aboutLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(
    InicioActions.loadIniciosSuccess,
    (state): InicioState => ({ ...state, techTypesLoading: true, techsLoading: true, aboutLoading: true })
  ),
  on(
    InicioActions.loadTechsTypesSuccess,
    (state, action): InicioState => ({ ...state, techTypes: action.response, techTypesLoading: false })
  ),
  on(
    InicioActions.loadTechsTypesFailure,
    (state, action): InicioState => ({ ...state, techTypesError: action.error, techTypesLoading: false })
  ),
  on(
    InicioActions.loadTechsSuccess,
    (state, action): InicioState => ({ ...state, techs: action.response, techsLoading: false })
  ),
  on(
    InicioActions.loadTechsFailure,
    (state, action): InicioState => ({ ...state, techsError: action.error, techsLoading: false })
  ),
  on(
    InicioActions.loadAboutmesSuccess,
    (state, action): InicioState => ({ ...state, aboutMe: action.data, aboutLoading: false })
  ),
  on(
    InicioActions.loadAboutmesFailure,
    (state, action): InicioState => ({ ...state, aboutMeError: action.error, aboutLoading: false })
  ),
);
