import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { map, Observable } from 'rxjs';
import { CrudService } from 'src/core/classes/crud-state/crud.service';
import { MultipleRecordsResponse } from '../models/MultipleRecordsResponse';
import { Tech } from '../models/Tech.model';
import { appStateTypes } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class TechService extends CrudService<appStateTypes> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient
  ) {
    super('Tech', serviceElementsFactory);
  }

  override getAll(): Observable<Tech[]> {
    return this.http
      .get<MultipleRecordsResponse<Tech>>(
        `${this.apiUrl}/${this.entityName.toLowerCase()}s/`
      )
      .pipe(
        map((value) => {
          this.totalRecords = value.totalRecords;
          return value.data;
        })
      );
  }

  override getWithQueryCustom(
    techTypeName: string,
    query: string
  ): Observable<Tech[]> {
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

  override addCustom(tech: Tech) {
    let formData: FormData = new FormData();

    const imageFile = tech.imageFile;
    tech = { ...tech, imageFile: undefined };

    formData.append('tech', JSON.stringify(tech));
    if (imageFile) {
      formData.append('imagen', imageFile as Blob);
    }

    return this.http.post(`${this.apiUrl}/tech/`, formData);
  }
}
