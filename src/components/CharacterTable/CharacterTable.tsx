import { FC, useMemo } from 'react'
import styles from './characterTable.module.scss'
import { ICharacter } from '@/Context/CharacterContextData.types'

type ILeastPopularCharacter = {
  [key: string]: string
}

interface CharacterTableProps {
  characters: ICharacter[],
  getLeastPopularCharacter: () => ILeastPopularCharacter | undefined
}

const CharacterTable: FC<CharacterTableProps> = ({ characters, getLeastPopularCharacter }) => {
  /**
   *  I moved the main business  logic of this component to the context file
   * */

  // const leastPopularCharacter = useMemo((): ILeastPopularCharacter | undefined => {
  //   if (characters.length > 0) {
  //     const data = findLeastPopularCharacter()

  //     if (data) {
  //       const { name, status, species, gender, origin, location, image, episode } = data

  //       const originAndDimension = `${location.name} - ${origin.name}`
  //       const popularity = String(episode.length)

  //       return { name, status, species, gender, originAndDimension, image, popularity }
  //     }
  //   }
  // }, [characters, findLeastPopularCharacter])

  const displayOrder = ['name', 'originAndDimension', 'status', 'species', 'gender', 'popularity']

  const formatTitle = (key: string) => key.replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/^./, (char) => char.toUpperCase())

  if (characters.length === 0) {
    return <p>No character data available. Try to refresh the page.</p>
  }

  const leastPopularCharacter = useMemo(() => {
    if (characters.length > 0) {
      return getLeastPopularCharacter()
    }
  }, [characters, getLeastPopularCharacter])

  return (
    <div className={styles.tableContainer}>
      <h2>The least popular character</h2>
      {
        leastPopularCharacter && (
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
        )
      }
    </div>
  )
}

export default CharacterTable
