import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInicio from './inicio.reducer';

export const selectInicioState = createFeatureSelector<fromInicio.InicioState>(
  fromInicio.inicioFeatureKey
);

export const selectLoadingInicio = createSelector(
  selectInicioState,
  state => state.loading
);

export const selectTechTypesInicio = createSelector(
  selectInicioState,
  state => state.techTypes
);

export const selectTechsInicio = createSelector(
  selectInicioState,
  state => state.techs
);

export const selectAboutMeInfo = createSelector(
  selectInicioState,
   state => state.aboutMe
);