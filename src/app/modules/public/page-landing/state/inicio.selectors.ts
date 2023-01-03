import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInicio from './inicio.reducer';

export const selectInicioState = createFeatureSelector<fromInicio.InicioState>(
  fromInicio.inicioFeatureKey
);

export const selectTechTypesInicio = createSelector(
  selectInicioState,
  state => state.techTypes
);

export const selectTechTypesLoadingInicio = createSelector(
  selectInicioState,
  state => state.techTypesLoading
);

export const selectTechsInicio = createSelector(
  selectInicioState,
  state => state.techs
);

export const selectAboutMeInfo = createSelector(
  selectInicioState,
   state => state.aboutMe
);