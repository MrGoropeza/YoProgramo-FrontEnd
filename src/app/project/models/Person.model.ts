import { Experience } from "./Experience.model";
import { Place } from "./Place.model";

export interface Person{
    id: number;
    itsMe: boolean;
    name: string;
    nameUrl: string;
    title: string;
    imageFile?: File;
    imageUrl: string;
    actualWork: Experience;
    actualCareer: Place;
}
