import {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import {
  ICharacterContextType,
  ICharacter,
} from './CharacterContextData.types'
import { ICharactersResponse } from './CharacterContextNetwork.types'

const CharacterContext = createContext<ICharacterContextType | undefined>(
  undefined,
)

// This context provider store the fetched data in the context object of ContextAPI
// For future use by other components

export const CharacterProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [characters, setCharacters] = useState<ICharacter[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchCharacters = async () => {
    const apiUrl = 'https://rickandmortyapi.com/api/character'

    let nextCharacters: string | any[] = []
    let nextUrl: string | null = apiUrl // For convenient init of the starting endpoint

    // By default, this API returns 20 characters per page, so
    // I loop through the pages until I get nextsPage: null (no more next page of characters)
    // to get all the characters (826 counted in the original documentation. Ref: https://rickandmortyapi.com/documentation/#character)

    try {
      setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  const findLeastPopularCharacter = useCallback(
    (locationName: string) => {
      if (characters.length > 0) {
        // According to the schema, .location is the character's last known location endpoint.
        const charactersFromGivenLocation = characters.filter(
          (character) => character.location.name === locationName,
        )

        const sortedByEpisodeLengthAndName = charactersFromGivenLocation.sort((a, b) => {
          if (a.episode.length === b.episode.length) {
            return b.name.localeCompare(a.name)
          }
          return a.episode.length - b.episode.length
        })

        const lastCharacterInTheList = sortedByEpisodeLengthAndName[0]

        return lastCharacterInTheList
      }
    },
    [characters],
  )

  useEffect(() => {
    // When the provider mounts, fetch
    setIsLoading(true)
    fetchCharacters().finally(() => setIsLoading(false))
  }, [])

  return (
    <CharacterContext.Provider
      value={{ isLoading, characters, fetchCharacters, findLeastPopularCharacter }}
    >
      {children}
    </CharacterContext.Provider>
  )
}

export const useCharacterContext = () => {
  const context = useContext(CharacterContext)

  if (context === undefined) {
    throw new Error(
      'useCharacterContext must be used within a CharacterProvider',
    )
  }

  return context
}
