/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Terminal, TerminalService } from 'primeng/terminal';
import { Subscription } from 'rxjs';
import * as TerminalSelectors from './state/terminal.selectors';
import * as TerminalActions from './state/terminal.actions';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('terminal') terminal!: Terminal;
  private terminalService!: TerminalService;

  suscriptions$ = new Subscription();

  welcomeMessage = `Bienvenido a la consola de mi portfolio.\nEscribí 'help' para ver los comandos disponibles.`;

  actualUser = {
    name: 'invitado',
    path: '',
  };

  constructor(private store: Store) {}

  commandHistory: string[] = [];
  actualIndex = 0;

  ngAfterViewInit(): void {
    this.initTerminal();
    this.store.dispatch(
      TerminalActions.TerminalOpenSuccess({
        terminal: this.terminal,
      })
    );
  }

  private initTerminal() {
    this.terminalService = this.terminal.terminalService;

    this.suscriptions$.add(
      this.terminalService.commandHandler.subscribe((command) => {
        this.commandHistory.push(command);
        this.actualIndex = this.commandHistory.length;
        this.store.dispatch(TerminalActions.TerminalSendCommand({ command }));

        this.stylePrompts();
      })
    );
    const actualUser$ = this.store.select(
      TerminalSelectors.selectTerminalActualUser
    );
    this.suscriptions$.add(
      actualUser$.subscribe((value) => {
        this.actualUser = value;
        this.stylePrompts();
      })
    );

    this.stylePrompts();
  }

  ngOnDestroy(): void {
    this.suscriptions$.unsubscribe();
  }

  stylePrompts() {
    const styledPrompt = `<span class="terminal-prompt-user">${this.actualUser.name}@GonzaloOropeza</span><span class="terminal-prompt-separator">:</span><span class="terminal-prompt-path">Portfolio/${this.actualUser.path}</span><span class="terminal-prompt-separator">$</span>`;
    const prompt = (
      this.terminal.el.nativeElement as HTMLElement
    ).getElementsByClassName('p-terminal-content-prompt');

    prompt.item(0)!.innerHTML = styledPrompt;

    setTimeout(() => {
      const prompts = (
        this.terminal.el.nativeElement as HTMLElement
      ).getElementsByClassName('p-terminal-prompt');
      for (let index = 0; index < prompts.length; index++) {
        prompts.item(index)!.innerHTML = styledPrompt;
      }
    }, 1);
  }

  setPrompt(text: string) {
    setTimeout(() => {
      const prompt = (
        this.terminal.el.nativeElement as HTMLElement
      ).getElementsByClassName('p-terminal-content-prompt');
      prompt.item(0)!.innerHTML = text;
    }, 1);
  }
}
