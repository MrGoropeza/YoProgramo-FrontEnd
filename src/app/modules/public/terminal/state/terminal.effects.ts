import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Terminal, TerminalService } from 'primeng/terminal';
import { map } from 'rxjs';
import { CommandModel } from 'src/app/project/models/command.model';
import { StateService } from 'src/app/project/services/state.service';
import { TerminalComponent } from '../terminal.component';

import * as terminalActions from './terminal.actions';

@Injectable()
export class TerminalEffects {
  private dialogRef!: DynamicDialogRef;
  private terminal!: Terminal;
  private terminalService!: TerminalService;
  private interactiveCommandRunning = false;

  openTerminal$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(terminalActions.TerminalOpenCommand),
        map(() => {
          this.dialogRef = this.dialogService.open(TerminalComponent, {
            header: 'Terminal',
            modal: false,
            position: 'bottom-right',
          });
        })
      );
    },
    { dispatch: false }
  );

  openSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(terminalActions.TerminalOpenSuccess),
        map((action) => {
          this.terminal = action.terminal;
          this.terminalService = action.terminal.terminalService;
        })
      );
    },
    { dispatch: false }
  );

  closeTerminal$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(terminalActions.TerminalExitCommand),
        map(() => {
          if (this.dialogRef) {
            this.dialogRef.close();
          }
        })
      );
    },
    { dispatch: false }
  );

  sendedCommand$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(terminalActions.TerminalSendCommand),
      map((action) => {
        const command = this.commands.find((c) => c.name === action.command);
        if (command) {
          return command.action;
        } else {
          this.terminalService.sendResponse(
            `${action.command}: comando no encontrado`
          );
          return terminalActions.TerminalCommandNotFound();
        }
      })
    );
  });

  helpCommand$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(terminalActions.TerminalHelpCommand),
        map(() => {
          const response = this.commands.reduce(
            (prev, command) =>
              prev.concat(`\t${command.name}   -   ${command.desc}\n`),
            'Comandos Disponibles:\n'
          );

          this.terminalService.sendResponse(response);
        })
      );
    },
    { dispatch: false }
  );

  clearCommand$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(terminalActions.TerminalClearCommand),
        map(() => {
          this.terminal.welcomeMessage = '';
          this.terminal.commands = [];
        })
      );
    },
    { dispatch: false }
  );

  commands: CommandModel[] = [
    {
      name: 'help',
      desc: 'Muestra los comandos disponibles',
      action: terminalActions.TerminalHelpCommand(),
    },
    {
      name: 'clear',
      desc: 'Limpia la consola',
      action: terminalActions.TerminalClearCommand(),
    },
    {
      name: 'exit',
      desc: 'Salir de la terminal',
      action: terminalActions.TerminalExitCommand(),
    },
    {
      name: 'places',
      desc: 'Abre el ABM de lugares',
      action: this.stateService.getState('Place').actions.openCrudDialog(),
    },
    {
      name: 'techtypes',
      desc: 'Abre el ABM de tipos de tecnolog??a',
      action: this.stateService.getState('TechType').actions.openCrudDialog(),
    },
    {
      name: 'techs',
      desc: 'Abre el ABM de tecnolog??as',
      action: this.stateService.getState('Tech').actions.openCrudDialog(),
    },
    {
      name: 'about',
      desc: 'Abre el Formulario para editar datos personales',
      action: this.stateService.getState('About').actions.openCrudForm({}),
    },
    // {
    //   name: 'login',
    //   desc: 'Iniciar sesi??n',
    //   action: terminalActions.TerminalLoginCommand(),
    // },
    // {
    //   name: 'logout',
    //   desc: 'Cerrar sesi??n',
    //   action: terminalActions.TerminalLogoutCommand(),
    // },
  ];

  constructor(
    private actions$: Actions,
    private dialogService: DialogService,
    private stateService: StateService
  ) {}
}
