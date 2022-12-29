import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TechCrudState, techsEditFeatureKey } from './tech.reducer';

export const selectTechCrudState = createFeatureSelector<TechCrudState>(
    techsEditFeatureKey
);

export const selectTechCrudModalState = createSelector(
    selectTechCrudState,
    state => ({
        loading: state.modalLoading,
        visible: state.modalVisible
    })
);