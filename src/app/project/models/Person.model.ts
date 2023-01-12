import { Education } from "./Education.model";
import { Experience } from "./Experience.model";

export interface Person{
    id: number;
    itsMe: boolean;
    name: string;
    nameUrl: string;
    title: string;
    imageFile?: File;
    imageUrl: string;
    actualWork: Experience;
    actualCareer: Education;
}
