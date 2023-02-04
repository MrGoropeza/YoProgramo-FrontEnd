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
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const expTime: number = JSON.parse(window.atob(token.split('.')[1])).exp;
    if (Date.now() >= expTime * 1000) {
      return null;
    }
    return token;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
