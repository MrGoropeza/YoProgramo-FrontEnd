import { createFeatureSelector, createSelector } from '@ngrx/store';
import { techsTypeFeatureKey, TechTypeCrudState } from './techs-type.reducer';

export const selectTechTypeCrudState = createFeatureSelector<TechTypeCrudState>(
    techsTypeFeatureKey
);

export const selectTechTypeCrudModalState = createSelector(
    selectTechTypeCrudState,
    state => ({
        loading: state.techTypesLoading,
        visible: state.modalVisible
    })
);

export const selectTechTypes = createSelector(
    selectTechTypeCrudState,
    state => state.techTypes
);

export const selectTechTypesLoading = createSelector(
    selectTechTypeCrudState,
    state => state.techTypesLoading
);