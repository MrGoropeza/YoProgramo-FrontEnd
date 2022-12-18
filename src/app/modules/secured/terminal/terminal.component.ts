import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Terminal, TerminalService } from 'primeng/terminal';
import { Observable, Subscription } from 'rxjs';
import { CommandModel } from 'src/app/project/models/command.model';
import { UserTerminalService } from 'src/app/project/services/terminal.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild("terminal") terminal!: Terminal;

  constructor(
    private userTerminalService: UserTerminalService,
    private activatedRoute: ActivatedRoute
  ) { }
  
  commandHandler$!: Observable<string>;
  commandHandlerSub!: Subscription;

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.commandHandler$ = this.userTerminalService.initTerminal(this.terminal);
    this.commandHandlerSub = this.commandHandler$.subscribe(
      command => {
        this.userTerminalService.handleCommand(command);
      }
    );
  }

  ngOnDestroy(): void {
    if(this.commandHandlerSub){this.commandHandlerSub.unsubscribe();}
  }
  
  @HostListener("keydown", ["$event.key"])
  onPressKeyUp(key: string){
    if(key === "ArrowDown"){
      this.userTerminalService.nextCommand();
      
    }else if(key === "ArrowUp"){
      this.userTerminalService.prevCommand();
    }
  }


}
