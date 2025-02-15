import { FC, useCallback, useMemo, useState } from 'react'
import styles from './characterTable.module.scss'
import { ICharacter } from '@/Context/CharacterContextData.types'
import { useCharacterContext } from '@/Context/CharacterContext'

type ILeastPopularCharacter = {
  [key: string]: string;
};

interface CharacterTableProps {}

const CharacterTable: FC<CharacterTableProps> = () => {
  const { characters, findLeastPopularCharacter } = useCharacterContext()

  const [selectedLocation, setSelectedLocation] =
    useState<string>('Earth (C-137)')

  const charactersLocations = useMemo(() => {
    return new Set(
      characters.map((character) => {
        return character.location.name
      }),
    )
  }, [characters])

  const leastPopularCharacter = useMemo(():
    | ILeastPopularCharacter
    | undefined => {
    if (characters.length > 0) {
      const data = findLeastPopularCharacter(selectedLocation)

      if (data) {
        const {
          name,
          status,
          species,
          gender,
          origin,
          location,
          image,
          episode,
        } = data

        const originAndDimension = `${location.name} - ${origin.name}`
        const popularity = String(episode.length)

        return {
          name,
          status,
          species,
          gender,
          originAndDimension,
          image,
          popularity,
        }
      }
    }
  }, [characters, selectedLocation, findLeastPopularCharacter])

  const displayOrder = [
    'name',
    'originAndDimension',
    'status',
    'species',
    'gender',
    'popularity',
  ]

  const formatTitle = (key: string) =>
    key
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .replace(/^./, (char) => char.toUpperCase())
      .concat(key === 'popularity' ? ' (appearances)' : '')

  if (characters.length === 0) {
    return <p>No character data available. Try to refresh the page.</p>
  }

  const handleLocationSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedLocation(event.target.value)
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableContainerHeader}>
        <h2>The least popular character from</h2>

        <select onChange={handleLocationSelect} defaultValue={selectedLocation}>
          {Array.from(charactersLocations).map((location) => {
            return (
              <option key={location} value={location}>
                {location}
              </option>
            )
          })}
        </select>
      </div>

      {leastPopularCharacter
        ? (
          <div className={styles.table}>
            <div className={styles.tableImage}>
              <img
                className={styles.image}
                src={leastPopularCharacter.image}
                alt={leastPopularCharacter.name}
              />
            </div>

            <div className={styles.detailsContainer}>
              {displayOrder.map((key, index) => (
                <div key={index} className={styles.tableRow}>
                  <div className={styles.titleCell}>{formatTitle(key)}</div>
                  <div className={styles.detailCell}>
                    {leastPopularCharacter[key]}
                  </div>
                </div>
              ))}
            </div>
          </div>
          )
        : (
          <p>Sorry, no character was found on planet {selectedLocation}</p>
          )}
    </div>
  )
}

export default CharacterTable
