
import { FC, useMemo } from 'react'

import styles from './characterTable.module.scss'

import { useCharacterContext } from '../../Context/CharacterContext'

type ILeastPopularCharacter = {
  [key: string]: string;
}

const CharacterTable: FC = () => {
  const { characters, findLeastPopularCharacter } = useCharacterContext()

  const leastPopularCharacter = useMemo((): ILeastPopularCharacter | undefined => {
    if (characters.length > 0) {
      const data = findLeastPopularCharacter(characters)

      if (data) {
        const { name, status, species, gender, origin, location, image, episode } = data

        const originAndDimension = `${location.name} - ${origin.name}`
        const popularity = String(episode.length)

        return { name, status, species, gender, originAndDimension, image, popularity }
      }
    }
  }, [characters, findLeastPopularCharacter])

  const displayOrder = ['name', 'originAndDimension', 'status', 'species', 'gender', 'popularity']

  const formatTitle = (key: string) => key.replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/^./, (char) => char.toUpperCase())

  if (characters.length === 0) {
    return <p>No character data available. Try to refresh the page.</p>
  }

  return (
    <div className={styles.tableContainer}>
      {
        leastPopularCharacter &&
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
                <div
                  key={index}
                  className={styles.tableRow}
                >
                  <div className={styles.titleCell}>
                    {formatTitle(key)}

                  </div>
                  <div className={styles.detailCell}>
                    {leastPopularCharacter[key]}
                  </div>
                </div>
              ))}
            </div>
          </div>
      }
    </div>
  )
}

export default CharacterTable
