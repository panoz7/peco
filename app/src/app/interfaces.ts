export interface Location {
    id: number;
    name: string;
    nests?: Nest[];
}

export interface Nest {
    id: number;
    name: string;
    locationId?: number;
}

export interface LocationDetails {
    id: number;
    name: string;
    nests: Nest[];
}