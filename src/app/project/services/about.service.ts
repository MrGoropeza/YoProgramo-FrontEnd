import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable, of } from 'rxjs';
import { CrudService } from 'src/core/classes/crud-state/crud.service';
import { Person } from '../models/about.model';
import { appStateTypes } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class AboutService extends CrudService<appStateTypes>{

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient
  ) {
    super('About', serviceElementsFactory);
  }

  override getWithQuery(): Observable<appStateTypes[]> {
      return of();
  }

  getMyInfo(): Observable<Person>{
    return this.http.get<Person>(`${this.apiUrl}/person/me/`);
  }

  saveMyInfo(me: Person): Observable<Person>{
    let formData: FormData = new FormData();

    const imageFile = me.imageFile;
    me = {...me, imageFile: undefined, itsMe: true};

    formData.append("person", JSON.stringify(me));
    if(imageFile){
      formData.append("imagen", imageFile as Blob);
    }

    return this.http.post<Person>(`${this.apiUrl}/person/`, formData);
  }
}
