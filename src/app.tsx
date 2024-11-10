import styles from './app.module.scss'
import CharactersLoader from './components/CharactersLoader/CharactersLoader'
import { CharacterProvider, useCharacterContext } from './Context/CharacterContext'
import CharacterTable from './components/CharacterTable/CharacterTable'
import Header from './components/Header/Header'
import CharacterPopularityGraph from './components/CharacterPopularityGraph/CharacterPopularityGraph'

const AppContent = () => {
  const { characters, findLeastPopularCharacter } = useCharacterContext()

  return (
    <div className={styles.appContent}>
      <Header />
      <div className={styles.mainContent}>
        <CharactersLoader />
        <CharacterTable characters={characters} findLeastPopularCharacter={findLeastPopularCharacter} />
        <CharacterPopularityGraph characters={characters} />
      </div>
    </div>
  )
}

export function App () {
  return (
    <CharacterProvider>
      <AppContent />
    </CharacterProvider>
  )
}
