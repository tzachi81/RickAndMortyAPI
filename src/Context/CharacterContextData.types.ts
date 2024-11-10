interface ILocation {
    name: string;
    url: string;
}

export interface ICharacter {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: ILocation;
    location: ILocation;
    image: string;
    episode: string[];
    url: string[];
    created: string;
}

export type ILeastPopularCharacter = {
    [key: string]: string
}
export interface ICharacterContextType {
    characters: ICharacter[];
    fetchCharacters: () => Promise<void>;
    findLeastPopularCharacter: () => ICharacter | undefined;
    getLeastPopularCharacter: () => ILeastPopularCharacter | undefined;
}
