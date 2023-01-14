import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable, map } from 'rxjs';
import { CrudService } from 'src/core/classes/crud-state/crud.service';
import { MultipleRecordsResponse } from '../models/MultipleRecordsResponse';
import { Project } from '../models/Project.model';
import { appStateTypes } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends CrudService<appStateTypes> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient
  ) {
    super('Project', serviceElementsFactory);
  }

  override getAll(): Observable<Project[]> {
    return this.http
      .get<MultipleRecordsResponse<Project>>(
        `${this.apiUrl}/${this.entityName.toLowerCase()}s/`
      )
      .pipe(
        map((value) => {
          this.totalRecords = value.totalRecords;
          return value.data;
        })
      );
  }

  override getWithQuery(query: string): Observable<Project[]> {
    return this.http
      .get<MultipleRecordsResponse<Project>>(
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
