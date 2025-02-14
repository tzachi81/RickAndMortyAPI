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

export interface ICharacterContextType {
    isLoading: boolean;
    characters: ICharacter[];
    fetchCharacters: () => Promise<void>;
    findLeastPopularCharacter: (locationName: string) => ICharacter | undefined;
}
