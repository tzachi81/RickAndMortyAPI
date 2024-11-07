import { ICharacter } from './CharacterContextData.types';

interface ICharactersResponseInfo {
    count: number,
    pages: number,
    next: string | null,
    prev: string
}

export interface ICharactersResponse {
    info: ICharactersResponseInfo;
    results: ICharacter[]
}