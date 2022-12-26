import { Action, createReducer, on } from '@ngrx/store';
import { TechModel } from 'src/app/project/models/tech.model';
import * as InicioActions from '../actions/inicio.actions';
import * as FrontendActions from '../actions/frontend.actions';
import * as BackendActions from '../actions/backend.actions';

export const inicioFeatureKey = 'inicio';

export interface InicioState {
  backendTechs: TechModel[];
  backendError: any;
  frontendTechs: TechModel[];
  frontendError: any;
  loading: boolean;
  errors: any[];
}

export const initialState: InicioState = {
  backendTechs: [],
  backendError: {},
  frontendTechs: [],
  frontendError: {},
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
    FrontendActions.loadFrontendsSuccess,
    (state, action): InicioState => ({ ...state, frontendTechs: action.data })
  ),
  on(
    FrontendActions.loadFrontendsFailure,
    (state, action): InicioState => ({ ...state, frontendError: action.error })
  ),
  on(
    BackendActions.loadBackendsSuccess,
    (state, action): InicioState => ({ ...state, backendTechs: action.data })
  ),
  on(
    BackendActions.loadBackendsFailure,
    (state, action): InicioState => ({ ...state, backendError: action.error })
  ),
);
