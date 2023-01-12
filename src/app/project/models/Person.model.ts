import { Education } from "./Education.model";
import { Experience } from "./Experience.model";
import { Tech } from "./Tech.model";

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
    techs: Tech[];
}
