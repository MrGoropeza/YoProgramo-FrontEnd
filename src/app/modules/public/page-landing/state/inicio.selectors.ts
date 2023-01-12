import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInicio from './inicio.reducer';

export const selectInicioState = createFeatureSelector<fromInicio.InicioState>(
  fromInicio.inicioFeatureKey
);

export const selectTechsInicio = createSelector(
  selectInicioState,
  state => state.techs
);

export const selectAboutMeInfo = createSelector(
  selectInicioState,
   state => state.aboutMe
);

export const selectAboutLoading = createSelector(
  selectInicioState,
   state => state.aboutLoading
);
