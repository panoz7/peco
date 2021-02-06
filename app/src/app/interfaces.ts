export interface Location {
    id: number;
    name: string;
}

export interface Nest {
    id: number;
    name: string;
}

export interface LocationDetails {
    id: number;
    name: string;
    nests: Nest[];
}