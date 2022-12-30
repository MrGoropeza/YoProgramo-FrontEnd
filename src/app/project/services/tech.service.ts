import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EntityActionOptions,
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MultipleRecordsResponse } from '../models/MultipleRecordsResponse';
import { Tech } from '../models/Tech.model';

@Injectable({
  providedIn: 'root',
})
export class TechService extends EntityCollectionServiceBase<Tech> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient
  ) {
    super('Tech', serviceElementsFactory);
  }

  private apiUrl: string = environment.apiUrl;
  totalRecords = 0;

  getAllCustom(techTypeName: string, query: string): Observable<Tech[]> {
    return this.http
      .get<MultipleRecordsResponse<Tech>>(
        `${this.apiUrl}/${this.entityName.toLowerCase()}s/`,
        {
          params: { techTypeName, query },
        }
      )
      .pipe(
        map((value) => {
          this.totalRecords = value.totalRecords;
          return value.data;
        })
      );
  }
  
  override getWithQuery(query: string): Observable<Tech[]> {
    return this.http
      .get<MultipleRecordsResponse<Tech>>(
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
