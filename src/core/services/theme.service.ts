import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  theme!: string;

  constructor() { }

  setTheme(){
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.getItem("theme") === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      // document.documentElement.setAttribute("data-theme", "dark");
      this.theme = "dark";
    } else {
      document.documentElement.classList.remove('dark');
      // document.documentElement.setAttribute("data-theme", "default");
      this.theme = "light";
    }
  }

  setDarkTheme(){
    // Whenever the user explicitly chooses dark mode
    localStorage.setItem("theme", 'dark');
    this.setTheme();
  }

  setLightTheme(){
    // Whenever the user explicitly chooses light mode
    localStorage.setItem("theme", 'light');
    this.setTheme();
  }

  setOSTheme(){
    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem('theme');
    this.setTheme();
  }

  getTheme(){
    return this.theme;
  }

}
