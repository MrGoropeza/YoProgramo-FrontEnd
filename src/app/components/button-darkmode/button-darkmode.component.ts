import { Component, OnInit } from '@angular/core';
import { InputSwitchOnChangeEvent } from 'primeng/inputswitch';
import { ThemeService } from 'src/core/services/theme.service';

@Component({
  selector: 'app-button-darkmode',
  templateUrl: './button-darkmode.component.html',
  styleUrls: ['./button-darkmode.component.scss']
})
export class ButtonDarkmodeComponent implements OnInit {
  
  isOnDarkTheme!: boolean;
  
  constructor(
    private themeService: ThemeService,
  ) { 
    themeService.setTheme();
    this.isOnDarkTheme = themeService.getTheme() === "dark";
  }
  
  ngOnInit(): void {
  }
  
  themeSwitchClick(event: InputSwitchOnChangeEvent){
    if(event.checked){this.themeService.setDarkTheme()}
    else{this.themeService.setLightTheme()}
  }
}
