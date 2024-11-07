import { FC, useState, useEffect } from 'react'
import styles from './characterLoader.module.scss'

import { useCharacterContext } from '../../Context/CharacterContext'

// This logical component handles the fetching data from RickAndMorty API
// And store it in the context object of ContextAPI for future use

// I kept the commented list element for testing purposes

const CharacterLoader: FC = () => {
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
    <div className={styles.loader}>
      {isLoading
        ? (<p>Gettind Data...</p>)
        : (
          <div>
            <h2>Found {characters.length} characters</h2>
            {/* Make it read from disk cache */}
            <button className={styles.refreshButton} onClick={handleRefresh}>Refresh Data</button>
          </div>
          )}
    </div>
  )
}

export default CharacterLoader
