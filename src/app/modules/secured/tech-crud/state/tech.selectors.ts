import { createFeatureSelector, createSelector } from '@ngrx/store';
import { techFeatureKey, TechState } from './tech.reducer';

export const selectTechTypeCrudState = createFeatureSelector<TechState>(
    techFeatureKey
);

export const selectTechs = createSelector(
    selectTechTypeCrudState,
    state => state.techs
);

export const selectTechsLoading = createSelector(
    selectTechTypeCrudState,
    state => state.techsLoading
);

export const selectTechOperationState = createSelector(
    selectTechTypeCrudState,
    (state) => state.techOperationState
);