import { Person } from "./Person.model";
import { Place } from "./Place.model";
import { Tech } from "./Tech.model";

export interface Project{
  id: number;
  name: string;
  url: string;
  description: string;
  collab: Person[];
  techs: Tech[];
  place: Place;
}
