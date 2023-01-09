import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { map, Observable } from 'rxjs';
import { CrudService } from 'src/core/classes/crud-state/crud.service';
import { Experience } from '../models/Experience.model';
import { MultipleRecordsResponse } from '../models/MultipleRecordsResponse';
import { appStateTypes } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService extends CrudService<appStateTypes> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient
  ) {
    super('Experience', serviceElementsFactory);
  }

  override getAll(): Observable<Experience[]> {
    return this.http
      .get<MultipleRecordsResponse<Experience>>(
        `${this.apiUrl}/${this.entityName.toLowerCase()}s/`
      )
      .pipe(
        map((value) => {
          this.totalRecords = value.totalRecords;
          return value.data;
        })
      );
  }

  override getWithQuery(query: string): Observable<Experience[]> {
    return this.http
      .get<MultipleRecordsResponse<Experience>>(
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
