import { EntityMetadataMap, EntityDataModuleConfig, DefaultDataServiceConfig } from '@ngrx/data';
import { environment } from 'src/environments/environment';

const entityMetadata: EntityMetadataMap = {
  TechType: {},
  Tech: {},
  Place: {},
  About: {},
};

const pluralNames = { Tech: "Techs", TechType: "TechTypes", Place: "Places", About: "About" };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiUrl,
  timeout: 0,
}