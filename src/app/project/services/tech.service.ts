import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
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
  
  getWithQueryCustom(techTypeName: string, query: string): Observable<Tech[]> {
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

  addCustom(tech: Tech){
    let formData: FormData = new FormData();

    const imageFile = tech.imageFile;
    tech = {...tech, imageFile: undefined};

    formData.append("tech", JSON.stringify(tech));
    formData.append("imagen", imageFile as Blob);

    return this.http.post(`${this.apiUrl}/tech/`, formData);
  }
}
