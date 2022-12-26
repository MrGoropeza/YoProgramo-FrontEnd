import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInicio from '../reducers/inicio.reducer';

export const selectInicioState = createFeatureSelector<fromInicio.InicioState>(
  fromInicio.inicioFeatureKey
);

export const selectFrontendTechs = createSelector(
  selectInicioState,
  state => state.frontendTechs
);

export const selectBackendTechs = createSelector(
  selectInicioState,
  state => state.backendTechs
);

export const selectLoadingInicio = createSelector(
  selectInicioState,
  state => state.loading
);