import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable, map } from 'rxjs';
import { CrudService } from 'src/core/classes/crud-state/crud.service';
import { Skill } from '../models/Skill.model';
import { MultipleRecordsResponse } from '../models/MultipleRecordsResponse';
import { appStateTypes } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class SkillService extends CrudService<appStateTypes> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient
  ) {
    super('Skill', serviceElementsFactory);
  }

  override getAll(): Observable<Skill[]> {
    return this.http
      .get<MultipleRecordsResponse<Skill>>(
        `${this.apiUrl}/${this.entityName.toLowerCase()}s/`
      )
      .pipe(
        map((value) => {
          this.totalRecords = value.totalRecords;
          return value.data;
        })
      );
  }

  override getWithQuery(query: string): Observable<Skill[]> {
    return this.http
      .get<MultipleRecordsResponse<Skill>>(
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
