import { TechType } from "./TechType.model";

export interface Tecnologia{
    id?: number;
    name: string;
    imageUrl: string;
    description: string;
    tipo: TechType;
}