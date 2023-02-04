import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { map } from 'rxjs';
import { CrudService } from 'src/core/classes/crud-state/crud.service';
import { User } from '../models/User.model';
import { appStateTypes } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CrudService<appStateTypes> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient
  ) {
    super('Auth', serviceElementsFactory);
  }

  login(user: User) {
    return this.http
      .post(`${this.apiUrl}/login`, user, {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          return response.headers;
        })
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
