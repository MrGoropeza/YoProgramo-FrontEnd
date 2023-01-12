import { createReducer, on } from '@ngrx/store';
import * as InicioActions from './inicio.actions';
import { Person } from 'src/app/project/models/Person.model';
import { SelectItemGroup } from 'primeng/api';
import { getSelectItemGroup } from 'src/app/project/utils/utils';

export const inicioFeatureKey = 'inicio';

export interface InicioState {
  aboutMe: Person;
  aboutMeError: unknown;
  aboutLoading: boolean;
  techs: SelectItemGroup[];
}

export const initialState: InicioState = {
  aboutMe: {} as Person,
  aboutMeError: {},
  aboutLoading: false,
  techs: []
};

export const reducer = createReducer(
  initialState,
  on(
    InicioActions.loadAboutmes,
    (state): InicioState => ({ ...state, aboutLoading: true })
  ),
  on(
    InicioActions.loadAboutmesSuccess,
    (state, action): InicioState => ({
      ...state,
      aboutMe: action.data,
      techs: getSelectItemGroup(action.data.techs),
      aboutLoading: false,
    })
  ),
  on(
    InicioActions.loadAboutmesFailure,
    (state, action): InicioState => ({
      ...state,
      aboutMeError: action.error,
      aboutLoading: false,
    })
  )
);
