import { HostListener, Injectable } from '@angular/core';
import { Terminal} from 'primeng/terminal';
import { firstValueFrom, Observable } from 'rxjs';
import { CommandModel } from '../models/command.model';

@Injectable({
  providedIn: 'root'
})
export class UserTerminalService {

  constructor() {}

  actualUser = {
    name: "invitado",
    path: ""
  }

  welcomeMessage = `Bienvenido a la consola de mi portfolio.\nEscribí 'help' para ver los comandos disponibles.`;
  terminal!: Terminal;
  commands: CommandModel[] = [
    {
      name: "help",
      desc: "Muestra los comandos disponibles",
    },
    {
      name: "clear",
      desc: "Limpia la consola",
    },
    {
      name: "login",
      desc: "Iniciar sesión"
    },
    {
      name: "logout",
      desc: "Cerrar sesión"
    },
    {
      name: "register",
      desc: "Registrarse"
    },
    {
      name: "exit",
      desc: "Salir de la terminal"
    }
  ];

  commandHistory: string[] = [];

  initTerminal(terminal: Terminal): Observable<string>{
    this.terminal = terminal;
    terminal.welcomeMessage = this.welcomeMessage;
    this.stylePrompts();
    return terminal.terminalService.commandHandler;
  }
  
  stylePrompts(){
    const styledPrompt = `<span class="terminal-prompt-user">${this.actualUser.name}@GonzaloOropeza</span><span class="terminal-prompt-separator">:</span><span class="terminal-prompt-path">Portfolio/${this.actualUser.path}</span><span class="terminal-prompt-separator">$</span>`;
    const prompt = (this.terminal.el.nativeElement as HTMLElement).getElementsByClassName("p-terminal-content-prompt");

    prompt.item(0)!.innerHTML = styledPrompt;

    setTimeout(() => {
      const prompts = (this.terminal.el.nativeElement as HTMLElement).getElementsByClassName("p-terminal-prompt");
      for (let index = 0; index < prompts.length; index++) {
        prompts.item(index)!.innerHTML = styledPrompt;
      }
    }, 1);
  }

  setPrompt(text: string){
    setTimeout(() => {
      const prompt = (this.terminal.el.nativeElement as HTMLElement).getElementsByClassName("p-terminal-content-prompt");
      prompt.item(0)!.innerHTML = text;
    }, 1);
  }

  helpCommand(){
    const response = this.commands.reduce(
      (prev, command) => prev.concat(`\t${command.name}   -   ${command.desc}\n`),
      "Comandos Disponibles:\n"
    );

    this.terminal.terminalService.sendResponse(response);
  }

  clearCommand(){
    this.terminal.welcomeMessage = "";
    this.terminal.commands = [];
  }

  interactiveCommandRunning = false;

  async logInCommand(){
    this.clearCommand();
    this.interactiveCommandRunning = true;
    this.setPrompt("Nombre de Usuario:");
    const username = await firstValueFrom(this.terminal.terminalService.commandHandler);
    
    this.clearCommand();
    this.setPrompt("Contraseña:");

    const inputPrompt = this.terminal.el.nativeElement.children[0].children[1].children[1] as HTMLElement;
    inputPrompt.setAttribute("type", "password");

    const password = await firstValueFrom(this.terminal.terminalService.commandHandler);

    inputPrompt.setAttribute("type", "text");

    this.clearCommand();
    this.actualUser.name = username;
    this.stylePrompts();
    this.interactiveCommandRunning = false;
  }

  logOutCommand(){
    this.clearCommand();
    this.actualUser.name = "invitado";
    this.stylePrompts();
  }

  registerCommand(){

  }

  exitCommand(){

  }

  handleCommand(command: string){
    if(this.interactiveCommandRunning){return;}
    this.commandHistory.push(command);
    this.actualIndex = this.commandHistory.length;
    const action = this.commands.find(c => c.name === command);
    if(action){
      switch (action.name) {
        case "help":
          this.helpCommand();
          break;
        case "clear":
          this.clearCommand();
          break;
        case "login":
          this.logInCommand();
          break;
        case "logout":
          this.logOutCommand();
          break;
        case "register":
          this.registerCommand();
          break;
        case "exit":
          this.exitCommand();
          break;
      }
    }else{
      this.terminal.terminalService.sendResponse(`${command}: comando no encontrado`);
    }
    this.stylePrompts();
  }

  actualIndex = 0;

  prevCommand(){
    if(this.commandHistory.length > 0 && (this.actualIndex - 1) >= 0){
      this.terminal.command = this.commandHistory[this.actualIndex - 1];
      this.actualIndex -= 1;
    }
    this.moveCursorToEnd();
  }

  nextCommand(){
    if(this.commandHistory.length > 0 && (this.actualIndex + 1) < this.commandHistory.length){
      this.terminal.command = this.commandHistory[this.actualIndex + 1];
      this.actualIndex += 1;
    }else if(this.actualIndex + 1 === this.commandHistory.length){
      this.terminal.command = "";
    }
    this.moveCursorToEnd();
  }

  moveCursorToEnd(){
    const inputSearch = (this.terminal.el.nativeElement as HTMLElement).getElementsByClassName("p-terminal-input");
    const input = inputSearch.item(0)! as HTMLInputElement;
    input.setSelectionRange(input.value.length, input.value.length);
    input.focus();
  }

}