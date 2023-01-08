import { createReducer, on } from '@ngrx/store';
import * as actions from './terminal.actions';

export const terminalFeatureKey = 'terminal';

export interface TerminalState {
  loading: boolean;
  interactiveCommandRunning: boolean;
  welcomeMessage: string;
  actualUser: {name: string, path: string};
}

export const initialState: TerminalState = {
  loading: false,
  interactiveCommandRunning: false,
  welcomeMessage: `Bienvenido a la consola de mi portfolio.\nEscribí 'help' para ver los comandos disponibles.`,
  actualUser: {
    name: 'invitado',
    path: ''
  }
};

export const reducer = createReducer(
  initialState,
  on(
    actions.TerminalLoginCommand,
    (state): TerminalState => ({ ...state, interactiveCommandRunning: true })
  )
);
