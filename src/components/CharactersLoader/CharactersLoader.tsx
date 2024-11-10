import { FC, useState } from 'react'
import styles from './characterLoader.module.scss'

import { useCharacterContext } from '../../Context/CharacterContext'

// This logical component handles the fetching data from RickAndMorty API
// And optionally triggers the fetching on user button click

const CharacterLoader: FC = () => {
  const { characters, fetchCharacters } = useCharacterContext()
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = async () => {
    setIsLoading(true)
    await fetchCharacters()
    setIsLoading(false)
  }

  return (
    <div className={styles.loader}>
      {isLoading
        ? (<p>Gettind Data...</p>)
        : (
          <div className={styles.loaderContent}>
            <p className={styles.loaderHeader}>Found <span>{characters.length}</span> characters</p>
            {/* Make it read from disk cache */}
            <button className={styles.refreshButton} onClick={handleRefresh}>Refresh</button>
          </div>
          )}
    </div>
  )
}

export default CharacterLoader
