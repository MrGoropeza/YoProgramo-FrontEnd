import { Action, createReducer, on } from '@ngrx/store';
import { Tecnologia } from 'src/app/project/models/tech.model';
import * as InicioActions from './inicio.actions';
import * as AboutAction from '../actions/aboutme.actions';
import { AboutModel } from 'src/app/project/models/about.model';
import { MultipleRecordsResponse } from 'src/app/project/models/MultipleRecordsResponse';
import { TechType } from 'src/app/project/models/TechType.model';

export const inicioFeatureKey = 'inicio';

export interface InicioState {
  techTypes: MultipleRecordsResponse<TechType>;
  techTypesError: any;
  techs: Tecnologia[];
  techsError: any;
  aboutMe: AboutModel;
  aboutMeError: any;
  loading: boolean;
  errors: any[];
}

export const initialState: InicioState = {
  techTypes: {data: [], totalRecords: 0},
  techTypesError: undefined,
  techs: [],
  techsError: undefined,
  aboutMe: {} as AboutModel,
  aboutMeError: {},
  loading: false,
  errors: [],
};

export const reducer = createReducer(
  initialState,

  on(
    InicioActions.loadInicios,
    (state): InicioState => ({ ...state, loading: true })
  ),
  on(
    InicioActions.loadIniciosSuccess,
    (state): InicioState => ({ ...state, loading: false })
  ),
  on(
    InicioActions.loadIniciosFailure,
    (state, action): InicioState => ({
      ...state,
      loading: false,
      errors: [...state.errors, action.error],
    })
  ),
  on(
    InicioActions.loadTechsTypesSuccess,
    (state, action): InicioState => ({ ...state, techTypes: action.response })
  ),
  on(
    InicioActions.loadTechsTypesFailure,
    (state, action): InicioState => ({ ...state, techTypesError: action.error })
  ),
  on(
    InicioActions.loadTechsSuccess,
    (state, action): InicioState => ({ ...state, techs: action.data })
  ),
  on(
    InicioActions.loadTechsFailure,
    (state, action): InicioState => ({ ...state, techsError: action.error })
  ),
  on(
    AboutAction.loadAboutmesSuccess,
    (state, action): InicioState => ({ ...state, aboutMe: action.data })
  ),
  on(
    AboutAction.loadAboutmesFailure,
    (state, action): InicioState => ({ ...state, aboutMeError: action.error })
  ),
);
