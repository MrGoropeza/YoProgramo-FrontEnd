import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { About } from 'src/app/project/models/about.model';
import { StateService } from 'src/app/project/services/state.service';
import { selectAboutMeInfo } from '../../state/inicio.selectors';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor(
    private store: Store,
    private stateService: StateService
  ) { }

  aboutMeInfo$!: Observable<About>;

  ngOnInit(): void {
    this.aboutMeInfo$ = this.store.select(selectAboutMeInfo);
  }

  openAboutDialog(){
    this.store.dispatch(
      this.stateService.getState("About").actions.openCrudForm({})
    );
  }
}
