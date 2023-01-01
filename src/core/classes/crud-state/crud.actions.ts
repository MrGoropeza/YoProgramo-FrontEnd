import { createAction, props } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { MultipleRecordsResponse } from 'src/app/project/models/MultipleRecordsResponse';
import { Actions } from '@ngrx/effects';

export class CrudActions<Model> extends Actions{
  constructor(public modelName: string) {
    super();
  }

  // Open CRUD Dialog
  public openCrudDialog = createAction(
    `[${this.modelName}] Open ${this.modelName} Crud Dialog`
  );
  public closeCrudDialog = createAction(
    `[${this.modelName}] Close ${this.modelName} Crud Dialog`
  );

  // Open CRUD Form
  public openCrudForm = createAction(
    `[${this.modelName}] Open ${this.modelName} Form Dialog`,
    props<{ value: Model }>()
  );

  // Load CRUD Values
  public loadValues = createAction(
    `[${this.modelName}] Load ${this.modelName}s`,
    props<{ query?: LazyLoadEvent }>()
  );

  public loadValuesSuccess = createAction(
    `[${this.modelName}] Load ${this.modelName}s Success`,
    props<{ data: MultipleRecordsResponse<Model> }>()
  );

  public loadValuesFailure = createAction(
    `[${this.modelName}] Load ${this.modelName}s Failure`,
    props<{ error: any }>()
  );

  // Save CRUD Value
  public saveValue = createAction(
    `[${this.modelName}] Save ${this.modelName}s`,
    props<{ value: Model }>()
  );

  public saveValueSuccess = createAction(
    `[${this.modelName}] Save ${this.modelName}s Success`
  );

  public saveValueFailure = createAction(
    `[${this.modelName}] Save ${this.modelName}s Failure`,
    props<{ error: any }>()
  );

  // Delete CRUD Value
  public deleteValue = createAction(
    `[${this.modelName}] Delete ${this.modelName}s`,
    props<{ value: Model }>()
  );

  public deleteValueSuccess = createAction(
    `[${this.modelName}] Delete ${this.modelName}s Success`,
  );

  public deleteValueFailure = createAction(
    `[${this.modelName}] Delete ${this.modelName}s Failure`,
    props<{ error: any }>()
  );
}
