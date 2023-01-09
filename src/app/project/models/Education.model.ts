import { Place } from "./Place.model";

export interface Education{
  id: number;
  place: Place;
  title: string;
  description: string;
  startDate: Date;
  finishDate: Date;
  actualEducation: boolean;
}
