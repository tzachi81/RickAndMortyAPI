import React, { useState, useEffect } from 'react'
import { useCharacterContext } from '../../Context/CharacterContext'

// This logical component handles the fetching data from RickAndMorty API
// And store it in the context object of ContextAPI for future use

// I kept the commented list element for testing purposes

const CharacterLoader: React.FC = () => {
  const { characters, fetchCharacters } = useCharacterContext()
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = async () => {
    setIsLoading(true)
    await fetchCharacters()
    setIsLoading(false)
  }

  useEffect(() => {
    if (characters.length === 0) {
      handleRefresh()
    }
  }, [characters])

  return (
    <div>
      {isLoading
        ? (<p>Refreshing...</p>)
        : (
          <div>
            {/* Make it read from disk cache */}
            <button onClick={handleRefresh}>Refresh Data</button>
            {/* <ul>
            {characters.length > 0 ? (
              characters.map((character) => (
                <li key={character.id}>
                  <h3>{character.name}</h3>
                  <img width= {'50px'} src={character.image} alt={character.name} />
                </li>
              ))
            ) : (
              <p>No characters available.</p>
            )}
          </ul> */}
          </div>
          )}
    </div>
  )
}

export default CharacterLoader
