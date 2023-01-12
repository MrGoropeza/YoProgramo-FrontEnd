import { NgModule } from '@angular/core';
import { TechTypeCrudModule } from './tech-type-crud/tech-type-crud.module';
import { TechCrudModule } from './tech-crud/tech-crud.module';
import { AboutCrudModule } from './about-crud/about-crud.module';
import { PlaceCrudModule } from './place-crud/place-crud.module';
import { ExpCrudModule } from './exp-crud/exp-crud.module';
import { EducationCrudModule } from './education-crud/education-crud.module';



@NgModule({
  exports: [
    TechTypeCrudModule,
    TechCrudModule,
    AboutCrudModule,
    PlaceCrudModule,
    ExpCrudModule,
    EducationCrudModule
  ],
})
export class SecuredModule { }
