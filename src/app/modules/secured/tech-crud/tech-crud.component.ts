import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeTechsCrud } from './state/tech.actions';

@Component({
  selector: 'app-tech-crud',
  templateUrl: './tech-crud.component.html',
  styleUrls: ['./tech-crud.component.scss']
})
export class TechCrudComponent {

  @Input() modalVisible = false;

  constructor(
    private store: Store
  ){

  }

  modalVisibleChange(event: boolean){
    if(!event){
      this.store.dispatch(closeTechsCrud());
    }
  }

}
