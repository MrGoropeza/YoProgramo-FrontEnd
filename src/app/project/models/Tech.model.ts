import { TechType } from "./TechType.model";

export interface Tech{
    id?: number;
    name: string;
    imageUrl: string;
    description: string;
    tipo: TechType;
}