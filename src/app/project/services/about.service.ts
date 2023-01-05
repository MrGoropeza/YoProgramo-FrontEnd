import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { CrudService } from 'src/core/classes/crud-state/crud.service';
import { appStateTypes } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class AboutService extends CrudService<appStateTypes>{

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient
  ) {
    super('About', serviceElementsFactory);
  }
}
