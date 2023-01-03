import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { map, Observable } from 'rxjs';
import { CrudService } from 'src/core/classes/crud-state/crud.service';
import { MultipleRecordsResponse } from '../models/MultipleRecordsResponse';
import { TechType } from '../models/TechType.model';
import { appStateTypes } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class TechtypeService extends CrudService<appStateTypes> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient
  ) {
    super('TechType', serviceElementsFactory);
  }

  override getAll(): Observable<TechType[]> {
    return this.http
      .get<MultipleRecordsResponse<TechType>>(
        `${this.apiUrl}/${this.entityName.toLowerCase()}s/`
      )
      .pipe(
        map((value) => {
          this.totalRecords = value.totalRecords;
          return value.data;
        })
      );
  }

  override getWithQuery(query: string): Observable<TechType[]> {
    let params = undefined;

    if (query !== '') {
      params = { query };
    }

    return this.http
      .get<MultipleRecordsResponse<TechType>>(
        `${this.apiUrl}/${this.entityName.toLowerCase()}s/`,
        {
          params,
        }
      )
      .pipe(
        map((value) => {
          this.totalRecords = value.totalRecords;
          return value.data;
        })
      );
  }
}
