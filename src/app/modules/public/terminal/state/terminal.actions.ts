import { createAction, props } from '@ngrx/store';
import { Terminal } from 'primeng/terminal';

export const TerminalOpenCommand = createAction('[Terminal] Open Command');

export const TerminalOpenSuccess = createAction(
  '[Terminal] Open Success',
  props<{ terminal: Terminal }>()
);

export const TerminalExitCommand = createAction('[Terminal] Exit Command');

export const TerminalSendCommand = createAction(
  '[Terminal] Send Command',
  props<{ command: string }>()
);

export const TerminalCommandNotFound = createAction(
  '[Terminal] Command Not Found'
);

export const TerminalHelpCommand = createAction('[Terminal] Help Command');

export const TerminalClearCommand = createAction('[Terminal] Clear Command');

export const TerminalLoginCommand = createAction('[Terminal] Login Command');

export const LoginSuccess = createAction('[Login] Login Success');

export const LoginFailure = createAction('[Login] Login Failure');

export const TerminalLogoutCommand = createAction('[Terminal] Logout Command');

export const TerminalThemeCommand = createAction('[Terminal] Theme Command');
