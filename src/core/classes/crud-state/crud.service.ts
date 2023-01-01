/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { environment } from 'src/environments/environment';

export class CrudService<Model> extends EntityCollectionServiceBase<Model> {
  totalRecords = 0;
  protected apiUrl: string = environment.apiUrl;

  constructor(
    private modelName: string,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(modelName, serviceElementsFactory);
  }

  getWithQueryCustom(...params: any) {}

  addCustom(...params: any) {}
}
