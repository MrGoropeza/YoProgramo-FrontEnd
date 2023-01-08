import { Place } from "./place.model";

export interface Person{
    itsMe: boolean;
    name: string;
    nameUrl: string;
    title: string;
    imageUrl: string;
    actualWork: Place;
    actualCareer: Place;
}
