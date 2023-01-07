import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { map, Observable } from 'rxjs';
import { CrudService } from 'src/core/classes/crud-state/crud.service';
import { MultipleRecordsResponse } from '../models/MultipleRecordsResponse';
import { Place } from '../models/place.model';
import { appStateTypes } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class PlaceService extends CrudService<appStateTypes>{

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient
  ) {
    super('Place', serviceElementsFactory);
  }

  override getAll(): Observable<Place[]> {
    return this.http
      .get<MultipleRecordsResponse<Place>>(
        `${this.apiUrl}/${this.entityName.toLowerCase()}s/`,
      )
      .pipe(
        map((value) => {
          this.totalRecords = value.totalRecords;
          return value.data;
        })
      );
  }

  override getWithQuery(query: string): Observable<Place[]> {
    return this.http
      .get<MultipleRecordsResponse<Place>>(
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

  override addCustom(place: Place){
    let formData: FormData = new FormData();

    const imageFile = place.imageFile;
    place = {...place, imageFile: undefined};


    formData.append("place", JSON.stringify(place));
    if(imageFile){
      formData.append("imagen", imageFile as Blob);
    }

    return this.http.post(`${this.apiUrl}/${this.entityName.toLowerCase()}/`, formData);
  }
}
