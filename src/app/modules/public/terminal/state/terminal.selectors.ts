import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTerminal from './terminal.reducer';

export const selectTerminalState = createFeatureSelector<fromTerminal.TerminalState>(
  fromTerminal.terminalFeatureKey
);

export const selectTerminalActualUser = createSelector(
  selectTerminalState,
  state => state.actualUser
);
