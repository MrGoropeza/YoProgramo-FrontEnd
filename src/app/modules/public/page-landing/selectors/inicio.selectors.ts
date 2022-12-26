import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInicio from '../reducers/inicio.reducer';

export const selectInicioState = createFeatureSelector<fromInicio.State>(
  fromInicio.inicioFeatureKey
);
