import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable, map } from 'rxjs';
import { CrudService } from 'src/core/classes/crud-state/crud.service';
import { MultipleRecordsResponse } from '../models/MultipleRecordsResponse';
import { Person } from '../models/Person.model';
import { appStateTypes } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends CrudService<appStateTypes> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient
  ) {
    super('Person', serviceElementsFactory);
  }

  override getAll(): Observable<Person[]> {
    return this.http
      .get<MultipleRecordsResponse<Person>>(
        `${this.apiUrl}/${this.entityName.toLowerCase()}s/`,
      )
      .pipe(
        map((value) => {
          this.totalRecords = value.totalRecords;
          return value.data;
        })
      );
  }

  override getWithQuery(query: string): Observable<Person[]> {
    return this.http
      .get<MultipleRecordsResponse<Person>>(
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

  override add(person: Person): Observable<Person> {
      let formData: FormData = new FormData();

      const imageFile = person.imageFile;
      person = {...person, imageFile: undefined, itsMe: false};

      formData.append("person", JSON.stringify(person));
      if(imageFile){
        formData.append("imagen", imageFile as Blob);
      }

      return this.http.post<Person>(`${this.apiUrl}/person/`, formData);

  }
}
