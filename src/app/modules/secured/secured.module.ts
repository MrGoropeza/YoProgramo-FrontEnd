import { NgModule } from '@angular/core';
import { TechTypeCrudModule } from './tech-type-crud/tech-type-crud.module';
import { TechCrudModule } from './tech-crud/tech-crud.module';
import { AboutCrudModule } from './about-crud/about-crud.module';
import { PlaceCrudModule } from './place-crud/place-crud.module';
import { ExpCrudModule } from './exp-crud/exp-crud.module';
import { EducationCrudModule } from './education-crud/education-crud.module';
import { SkillCrudModule } from './skill-crud/skill-crud.module';
import { PersonCrudModule } from './person-crud/person-crud.module';
import { ProjectCrudModule } from './project-crud/project-crud.module';



@NgModule({
  exports: [
    TechTypeCrudModule,
    TechCrudModule,
    AboutCrudModule,
    PlaceCrudModule,
    ExpCrudModule,
    EducationCrudModule,
    SkillCrudModule,
    PersonCrudModule,
    ProjectCrudModule
  ],
})
export class SecuredModule { }
