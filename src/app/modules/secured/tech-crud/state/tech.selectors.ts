import { createFeatureSelector, createSelector } from '@ngrx/store';
import { techFeatureKey, TechState } from './tech.reducer';

export const selectTechState = createFeatureSelector<TechState>(
    techFeatureKey
);

export const selectTechs = createSelector(
    selectTechState,
    state => state.techs
);

export const selectTechsLoading = createSelector(
    selectTechState,
    state => state.techsLoading
);

export const selectTechOperationState = createSelector(
    selectTechState,
    (state) => state.techOperationState
);