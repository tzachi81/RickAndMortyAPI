import React, { createContext, useContext, useEffect, useState } from 'react'
import { ICharacterContextType, ICharacter } from './CharacterContextData.types'
import { ICharactersResponse } from './CharacterContextNetwork.types'

const CharacterContext = createContext<ICharacterContextType | undefined>(undefined)

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [characters, setCharacters] = useState<ICharacter[]>([])

  const fetchCharacters = async () => {
    const url = 'https://rickandmortyapi.com/api/character'

    let nextCharacters: string | any[] = []
    let nextUrl: (string | null) = url // For convenient init of the starting endpoint

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

        // Gets the next page URL
        // For example: https://rickandmortyapi.com/api/character?page=3
        nextUrl = result.info.next
      }
      setCharacters(nextCharacters)
    } catch (err) {
      console.error('Fetch error:', err)
    }
  }

  useEffect(() => {
    // When the provider mounts do:
    fetchCharacters()
  }, [])

  return (
    <CharacterContext.Provider
      value={{ characters, fetchCharacters }}
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
