import { Place } from "./Place.model";

export interface Experience{
  id: number;
  place: Place;
  title: string;
  description: string;
  startDate: Date;
  finishDate: Date;
  actualWork: boolean;
}
