import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { map, Observable } from 'rxjs';
import { CrudService } from 'src/core/classes/crud-state/crud.service';
import { Education } from '../models/Education.model';
import { MultipleRecordsResponse } from '../models/MultipleRecordsResponse';
import { appStateTypes } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class EducationService extends CrudService<appStateTypes> {

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient
  ) {
    super('Education', serviceElementsFactory);
  }

  override getAll(): Observable<Education[]> {
    return this.http
      .get<MultipleRecordsResponse<Education>>(
        `${this.apiUrl}/${this.entityName.toLowerCase()}s/`
      )
      .pipe(
        map((value) => {
          this.totalRecords = value.totalRecords;
          return value.data;
        })
      );
  }

  override getWithQuery(query: string): Observable<Education[]> {
    return this.http
      .get<MultipleRecordsResponse<Education>>(
        `${this.apiUrl}/${this.entityName.toLowerCase()}s/`,
        {
          params: { query },
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
