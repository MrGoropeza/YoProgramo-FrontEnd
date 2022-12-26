import { Action, createReducer, on } from '@ngrx/store';
import * as InicioActions from '../actions/inicio.actions';

export const inicioFeatureKey = 'inicio';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,

  on(InicioActions.loadInicios, state => state),
  on(InicioActions.loadIniciosSuccess, (state, action) => state),
  on(InicioActions.loadIniciosFailure, (state, action) => state),

);
