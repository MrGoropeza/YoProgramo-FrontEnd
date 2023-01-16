import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Terminal, TerminalService } from 'primeng/terminal';
import { map } from 'rxjs';
import { Command } from 'src/app/project/models/Command.model';
import { StateService } from 'src/app/project/services/state.service';
import { ThemeService } from 'src/core/services/theme.service';
import { LoginComponent } from '../../login/login.component';
import { TerminalComponent } from '../terminal.component';

import * as terminalActions from './terminal.actions';

@Injectable()
export class TerminalEffects {
  private dialogRef!: DynamicDialogRef;
  private terminal!: Terminal;
  private terminalService!: TerminalService;

  openTerminal$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(terminalActions.TerminalOpenCommand),
        map(() => {
          this.dialogRef = this.dialogService.open(TerminalComponent, {
            header: 'Terminal',
            modal: false,
            position: 'bottom-right',
            styleClass: 'w-full sm:w-auto',
            style: {margin: 0}
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

  themeCommand = createEffect(
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

  themeCommand$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(terminalActions.TerminalThemeCommand),
        map(() => {
          if (this.themeService.theme === "dark") {
            this.themeService.setLightTheme()
          }else{
            this.themeService.setDarkTheme()
          }
        })
      );
    },
    { dispatch: false }
  );

  loginCommand$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(terminalActions.TerminalLoginCommand),
        map(() => {
          this.dialogService.open(LoginComponent, {
            header: "Iniciar Sesión"
          });
        })
      );
    },
    { dispatch: false }
  );


  commands: Command[] = [
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
      name: 'theme',
      desc: 'Cambia el tema de la página',
      action: terminalActions.TerminalThemeCommand()
    },
    {
      name: 'exit',
      desc: 'Salir de la terminal',
      action: terminalActions.TerminalExitCommand(),
    },
    {
      name: 'about',
      desc: 'Abre Formulario para editar datos personales',
      action: this.stateService.getState('About').actions.openCrudForm({}),
    },
    {
      name: 'places',
      desc: 'Abre el ABM de lugares',
      action: this.stateService.getState('Place').actions.openCrudDialog(),
    },
    {
      name: 'exp',
      desc: 'Abre ABM de experiencias',
      action: this.stateService.getState('Experience').actions.openCrudDialog(),
    },
    {
      name: 'education',
      desc: 'Abre ABM de educaciones',
      action: this.stateService.getState('Education').actions.openCrudDialog(),
    },
    {
      name: 'techtypes',
      desc: 'Abre ABM de tipos de tecnología',
      action: this.stateService.getState('TechType').actions.openCrudDialog(),
    },
    {
      name: 'techs',
      desc: 'Abre ABM de tecnologías',
      action: this.stateService.getState('Tech').actions.openCrudDialog(),
    },
    {
      name: 'skill',
      desc: 'Abre ABM de habilidades',
      action: this.stateService.getState('Skill').actions.openCrudDialog(),
    },
    {
      name: 'person',
      desc: 'Abre ABM de personas',
      action: this.stateService.getState('Person').actions.openCrudDialog(),
    },
    {
      name: 'project',
      desc: 'Abre ABM de proyectos',
      action: this.stateService.getState('Project').actions.openCrudDialog(),
    },
    {
      name: 'login',
      desc: 'Iniciar sesión',
      action: terminalActions.TerminalLoginCommand(),
    },
    // {
    //   name: 'logout',
    //   desc: 'Cerrar sesión',
    //   action: terminalActions.TerminalLogoutCommand(),
    // },
  ];

  constructor(
    private actions$: Actions,
    private dialogService: DialogService,
    private stateService: StateService,
    private themeService: ThemeService
  ) {}
}
