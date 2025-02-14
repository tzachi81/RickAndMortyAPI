import { FC, useMemo } from 'react'
import styles from './characterPopularityGraph.module.scss'
import { ICharacter } from '@/Context/CharacterContextData.types'
import { useCharacterContext } from '@/Context/CharacterContext'

interface ICharacterPopularityGraphProps {}

const CharacterPopularityGraph: FC<ICharacterPopularityGraphProps> = () => {
  interface ICharacterPopularity {
    [key: string]: number;
  }

  const targetCharactersList = [
    'Abradolf Lincler',
    'Arcade Alien',
    'Morty Smith',
    'Birdperson',
    'Mr. Meeseeks',
  ]

  const { characters } = useCharacterContext()

  const popularitiesByCharacterName: ICharacterPopularity | undefined =
    useMemo(() => {
      if (characters.length > 0) {
        return characters.reduce<ICharacterPopularity>(
          (popularitiesObject: ICharacterPopularity, character: ICharacter) => {
            if (targetCharactersList.includes(character.name)) {
              if (!popularitiesObject[character.name]) {
                popularitiesObject[character.name] = 0 // initialize new prop;
              }
              popularitiesObject[character.name] += character.episode.length
            }

            return popularitiesObject
          },
          {},
        )
      }
    }, [characters, targetCharactersList]);

  const maxPopularityInCharacters = useMemo(() => {
    const popularitiesArray =
      popularitiesByCharacterName && Object.values(popularitiesByCharacterName)
    return popularitiesArray && Math.max(...popularitiesArray)
  }, [popularitiesByCharacterName])

  // debatable color pallete...
  const barColors = [
    '#97c34c',
    '#fb6467ff',
    '#e762d7ff',
    '#69c8ecff',
    '#fafd7cff',
  ]

  // I have taken inspiration for this bar chart from
  // 'https://www.js-craft.io/blog/css-flexbox-bar-chart/'

  return (
    <div>
      {maxPopularityInCharacters &&
        popularitiesByCharacterName &&
        Object.keys(popularitiesByCharacterName).length > 0 && (
          <div className={styles.graphContent}>
            <h2 className={styles.graphHeader}>
              Popularity graph of given characters
            </h2>

            <div className={styles.barGraph}>
              {targetCharactersList.map((characterName, index) => {
                // calculates the height of each bar element (by popularity)
                const color = barColors[index]
                const popularity = popularitiesByCharacterName[characterName]
                const barItemHeight = Math.floor(
                  (popularity / maxPopularityInCharacters) * 100,
                )
                return (
                  <div className={styles.barContainer} key={`${characterName}`}>
                    <div className={styles.tickLinesContainer} />
                    <div className={styles.barItem}>
                      <dt className={styles.nameLabel}>{characterName}</dt>

                      <div
                        className={styles.bar}
                        style={{
                          height: `${barItemHeight}px`,
                          backgroundColor: `${color}`,
                        }}
                      />
                      <dd />

                      <span className={styles.popularityLabel}>
                        {popularity}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
      )}
    </div>
  )
}
export default CharacterPopularityGraph
