import { FC, useCallback, useEffect, useState } from 'react'
import styles from './characterLoader.module.scss'

import { useCharacterContext } from '../../Context/CharacterContext'
import { ThemedLoader } from '../ThemedLoader/ThemedLoader'

// This logical component handles the fetching data from RickAndMorty API
// And optionally triggers the fetching on user button click

const CharacterLoader: FC = () => {
  const { characters, fetchCharacters, isLoading } = useCharacterContext()

  const handleRefresh = useCallback(() => {
    fetchCharacters()
  }, [fetchCharacters])

  return (
    <>
      {isLoading ? 
      (
        <ThemedLoader />
      ) : 
      (
        // <div className={styles.loader}>
        <div className={styles.loaderContent} hidden={isLoading}>
          <p className={styles.loaderHeader}>
            Found <span>{characters.length}</span> characters
          </p>
          <button className={styles.refreshButton} onClick={handleRefresh}>
            Refresh
          </button>
        </div>
        // </div>
      )
      }
    </>
  )
}

export default CharacterLoader
