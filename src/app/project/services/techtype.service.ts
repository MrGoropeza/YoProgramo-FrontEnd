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
import { TechType } from '../models/TechType.model';

@Injectable({
  providedIn: 'root',
})
export class TechtypeService extends EntityCollectionServiceBase<TechType> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient
  ) {
    super('TechType', serviceElementsFactory);
  }

  private apiUrl: string = environment.apiUrl;
  totalRecords = 0;

  override getAll(): Observable<TechType[]> {
    return this.http
    .get<MultipleRecordsResponse<TechType>>(
      `${this.apiUrl}/${this.entityName.toLowerCase()}s/`,
    )
    .pipe(
      map((value) => {
        this.totalRecords = value.totalRecords;
        return value.data;
      })
    );
  }
  
  override getWithQuery(query: string): Observable<TechType[]> {
    return this.http
      .get<MultipleRecordsResponse<TechType>>(
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
