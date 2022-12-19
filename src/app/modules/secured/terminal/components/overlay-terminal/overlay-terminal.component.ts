import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay-terminal',
  templateUrl: './overlay-terminal.component.html',
  styleUrls: ['./overlay-terminal.component.scss']
})
export class OverlayTerminalComponent implements OnInit {

  visible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
