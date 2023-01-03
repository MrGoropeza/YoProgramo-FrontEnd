import { Place } from "./place.model";

export interface About{
    name: string;
    nameUrl: string;
    title: string;
    imageUrl: string;
    actualWork: Place;
    actualCareer: Place;
}