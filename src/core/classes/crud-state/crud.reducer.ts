/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReducer, on } from '@ngrx/store';
import { MultipleRecordsResponse } from 'src/app/project/models/MultipleRecordsResponse';
import { appStateNames } from 'src/app/project/services/state.service';
import { CrudActions } from './crud.actions';
import { CrudSelectors } from './crud.selectors';
export interface modelState<Model> {
  values: MultipleRecordsResponse<Model>;
  valuesError: any;
  valuesLoading: boolean;
  valueOperationState: string;
  valueSaveError: any;
  valueDeleteError: any;
}

export class CrudState<Model> {
  constructor(
    public modelName: appStateNames,
  ) {}

  public actions: CrudActions<Model> = new CrudActions(this.modelName);
  public selectors: CrudSelectors<Model> = new CrudSelectors(this.modelName);

  public modelFeatureKey = this.modelName;

  private initialState: modelState<Model> = {
    values: { data: [], totalRecords: 0 },
    valuesError: undefined,
    valuesLoading: false,
    valueOperationState: '',
    valueSaveError: undefined,
    valueDeleteError: undefined,
  };

  public modelReducer = createReducer(
    this.initialState,
    on(
      this.actions.loadValues,
      (state): modelState<Model> => ({ ...state, valuesLoading: true })
    ),
    on(
      this.actions.loadValuesSuccess,
      (state, action): modelState<Model> => ({
        ...state,
        values: action.data,
        valuesLoading: false,
      })
    ),
    on(
      this.actions.loadValuesFailure,
      (state, action): modelState<Model> => ({
        ...state,
        valuesError: action.error,
        valuesLoading: false,
      })
    ),
    on(
      this.actions.saveValue,
      (state): modelState<Model> => ({
        ...state,
        valueOperationState: 'loading',
      })
    ),
    on(
      this.actions.saveValueSuccess,
      (state): modelState<Model> => ({
        ...state,
        valueOperationState: 'success',
      })
    ),
    on(
      this.actions.saveValueFailure,
      (state, action): modelState<Model> => ({
        ...state,
        valueOperationState: 'error',
        valueSaveError: action.error,
      })
    ),
    on(
      this.actions.deleteValueFailure,
      (state, action): modelState<Model> => ({
        ...state,
        valueDeleteError: action.error,
      })
    )
  );
}
