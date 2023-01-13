import { createReducer, on } from '@ngrx/store';
import * as actions from './terminal.actions';

export const terminalFeatureKey = 'terminal';

export interface TerminalState {
  loading: boolean;
  actualUser: {name: string, path: string};
}

export const initialState: TerminalState = {
  loading: false,
  actualUser: {
    name: 'invitado',
    path: ''
  }
};

export const reducer = createReducer(
  initialState,
  on(
    actions.TerminalLoginCommand,
    (state): TerminalState => ({ ...state })
  )
);
