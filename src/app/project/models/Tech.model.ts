import { TechType } from "./TechType.model";

export interface Tech{
    id: number;
    name: string;
    imageUrl: string;
    imageFile?: File;
    description: string;
    tipo: TechType;
}
