export interface Tecnologia{
    id?: number;
    name: string;
    imageUrl: string;
    description: string;
    tipo: TipoTecnologia;
}

export interface TipoTecnologia{
    id: number;
    name: string;
}