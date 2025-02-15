import { FC, useMemo } from 'react'
import styles from './characterPopularityGraph.module.scss'
import { ICharacter } from '@/Context/CharacterContextData.types'
import { useCharacterContext } from '@/Context/CharacterContext'

interface ICharacterPopularityGraphProps {}

const CharacterPopularityGraph: FC<ICharacterPopularityGraphProps> = () => {
  interface ISelectedCharacter {
    name: string;
    image: string;
    popularity: number;
  }
  interface ISelectedCharacters {
    [name: string]: ISelectedCharacter;
  }

  // debatable color pallete...
  // TODO merge barcolors and targetCharactersList into one object
  const barColors = [
    '#bae8d9',
    '#fb6467ff',
    '#e762d7ff',
    '#69c8ecff',
    '#fafd7cff',
    '#C0DDBE',
  ]

  const { characters } = useCharacterContext()

  const popularitiesByCharacterName: ISelectedCharacters | undefined =
    useMemo(() => {
      const targetCharactersList = [
        'Abradolf Lincler',
        'Morty Smith',
        'Birdperson',
        'Mr. Meeseeks',
        'Rick Sanchez',
        'Summer Smith',
      ]

      if (characters.length > 0) {
        return characters.reduce<ISelectedCharacters>(
          (popularitiesObject: ISelectedCharacters, character: ICharacter) => {
            if (targetCharactersList.includes(character.name)) {
              if (!popularitiesObject[character.name]) {
                popularitiesObject[character.name] = {
                  name: character.name,
                  image: character.image,
                  popularity: 1,
                }
              }
              popularitiesObject[character.name].popularity +=
                character.episode.length
            }

            return popularitiesObject
          },
          {},
        )
      }
    }, [characters])

  const maxPopularityInCharacters: number | undefined = useMemo(() => {
    if (popularitiesByCharacterName) {
      const popularitiesArray = Object.keys(popularitiesByCharacterName).map(
        (name) => popularitiesByCharacterName[name].popularity,
      )
      return popularitiesArray && Math.max(...popularitiesArray)
    }
  }, [popularitiesByCharacterName])

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
              {
                Object.keys(popularitiesByCharacterName).map((character, index) => {
                  const { name, image, popularity } = popularitiesByCharacterName[character]
                  const color = barColors[index]
                  const barItemHeight = Math.floor(
                    (popularity / maxPopularityInCharacters) * 100,
                  )
                  return (
                    <div className={styles.barContainer} key={`${name}`}>
                      <div className={styles.tickLinesContainer} />
                      <div className={styles.barItem}>
                        <dt className={styles.nameLabel}>
                          <img src={image} alt={name} />
                          <p>{name}</p>
                        </dt>

                        <div
                          className={styles.bar}
                          style={{
                            height: `${barItemHeight}px`,
                            backgroundColor: `${color}`,
                          }}
                        />
                        <dd />

                        <span className={styles.popularityLabel}>
                          <p>{popularity}</p>
                        </span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
      )}
    </div>
  )
}
export default CharacterPopularityGraph
