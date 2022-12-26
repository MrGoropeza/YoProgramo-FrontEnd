import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Terminal } from 'primeng/terminal';
import { Observable, Subscription } from 'rxjs';
import { UserTerminalService } from 'src/app/project/services/terminal.service';

@Component({
  selector: 'app-overlay-terminal',
  templateUrl: './overlay-terminal.component.html',
  styleUrls: ['./overlay-terminal.component.scss']
})
export class OverlayTerminalComponent implements OnInit, OnDestroy, AfterViewInit {

  visible = false;
  @ViewChild("terminal") terminal!: Terminal;

  commandHandler$!: Observable<string>;
  commandHandlerSub!: Subscription;

  constructor(
    private userTerminalService: UserTerminalService,
    private activatedRoute: ActivatedRoute
  ) { }

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
    }else if(key === "Enter"){
      this.userTerminalService.stylePrompts();
    }
  }

}
