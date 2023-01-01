import { Place } from "./place.model";

export interface AboutModel{
    name: string;
    nameUrl: string;
    title: string;
    imageUrl: string;
    actualWork: Place;
    actualCareer: Place;
}