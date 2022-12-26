export interface AboutModel{
    name: string;
    nameUrl: string;
    title: string;
    imageUrl: string;
    actualWork: PlaceModel;
    actualCareer: PlaceModel;
}

export interface PlaceModel{
    id: string;
    name: string;
    url: string;
    imageUrl: string;
}