import { FC, createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { ICharacterContextType, ICharacter, ILeastPopularCharacter } from './CharacterContextData.types'
import { ICharactersResponse } from './CharacterContextNetwork.types'

const CharacterContext = createContext<ICharacterContextType | undefined>(undefined)

// This context provider store the fetched data in the context object of ContextAPI
// For future use by other components

export const CharacterProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [characters, setCharacters] = useState<ICharacter[]>([])

  const fetchCharacters = async () => {
    const apiUrl = 'https://rickandmortyapi.com/api/character'

    let nextCharacters: string | any[] = []
    let nextUrl: (string | null) = apiUrl // For convenient init of the starting endpoint

    // By default, this API returns 20 characters per page, so
    // I loop through the pages until I get nextsPage: null (no more next page of characters)
    // to get all the characters (826 counted in the original documentation. Ref: https://rickandmortyapi.com/documentation/#character)

    try {
      while (nextUrl) {
        const response = await fetch(nextUrl)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const result: ICharactersResponse = await response.json()
        nextCharacters = nextCharacters.concat(result.results) // Concatenate new results

        // Gets the next page URL, example: https://rickandmortyapi.com/api/character?page=3
        nextUrl = result.info.next
      }
      setCharacters(nextCharacters)
    } catch (err) {
      console.error('Fetch error:', err)
    }
  }

  const findLeastPopularCharacter = useCallback(() => {
    if (characters.length > 0) {
      const locationName = 'Earth (C-137)'

      // According to the schema, .location is the character's last known location endpoint.
      const leastPopularCharacters = characters
        .filter(character => character.location.name === locationName && character.episode.length === 1)

      // Sort the least characters A-Z
      const sortedLeastPopularCharactersByName = leastPopularCharacters.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })

      const lastCharacterInTheList = sortedLeastPopularCharactersByName.at(-1)

      return lastCharacterInTheList
    }
  }, [characters])

  const getLeastPopularCharacter = useCallback((): ILeastPopularCharacter | undefined => {
    if (characters.length > 0) {
      const data = findLeastPopularCharacter()

      if (data) {
        const { name, status, species, gender, origin, location, image, episode } = data

        const originAndDimension = `${location.name} - ${origin.name}`
        const popularity = String(episode.length)

        return { name, status, species, gender, originAndDimension, image, popularity }
      }
    }
  }, [characters, findLeastPopularCharacter])

  useEffect(() => {
    // When the provider mounts, fetch
    fetchCharacters()
  }, [])

  return (
    <CharacterContext.Provider
      value={{ characters, fetchCharacters, findLeastPopularCharacter, getLeastPopularCharacter }}
    >
      {children}
    </CharacterContext.Provider>
  )
}

export const useCharacterContext = () => {
  const context = useContext(CharacterContext)

  if (context === undefined) {
    throw new Error('useCharacterContext must be used within a CharacterProvider')
  }

  return context
}
