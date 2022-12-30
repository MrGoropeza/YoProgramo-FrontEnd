import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MultipleRecordsResponse } from '../models/MultipleRecordsResponse';
import { TechType } from '../models/TechType.model';

@Injectable({
  providedIn: 'root'
})
export class TechtypeService extends EntityCollectionServiceBase<TechType>{

  private apiUrl: string = environment.apiUrl;

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, private http: HttpClient) {
    super('TechType', serviceElementsFactory);
  }

  override getWithQuery(query: string): Observable<TechType[]> {
      return this.http.get<MultipleRecordsResponse<TechType>>(`${this.apiUrl}/techtypes/`, {
        params: {query}
      }).pipe(map(value => {
        this.totalRecords = value.totalRecords;
        return value.data;
      }));
  }

  totalRecords = 0;

}
