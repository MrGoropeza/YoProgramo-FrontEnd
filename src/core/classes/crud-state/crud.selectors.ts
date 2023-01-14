import { createFeatureSelector, createSelector } from '@ngrx/store';
import { modelState } from './crud.reducer';

export class CrudSelectors<Model> {
  constructor(public modelName: string) {}

  public selectCrudState = createFeatureSelector<modelState<Model>>(
    this.modelName
  );

  public selectValues = createSelector(
    this.selectCrudState,
    (state) => state.values
  );

  public selectValuesLoading = createSelector(
    this.selectCrudState,
    (state) => state.valuesLoading
  );

  public selectValuesOperationState = createSelector(
    this.selectCrudState,
    (state) => state.valueOperationState
  );

  public selectFormData = createSelector(
    this.selectCrudState,
    (state) => state.formData
  );
}
