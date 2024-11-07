import './app.css'
import CharactersLoader from './components/CharactersLoader/CharactersLoader'
import { CharacterProvider } from './Context/CharacterContext'
import CharacterTable from './components/CharacterTable/CharacterTable'
import Header from './components/Header/Header'

export function App () {
  return (
    <CharacterProvider>
      <div className='App'>
        <Header />
        <CharactersLoader />
        <CharacterTable />
      </div>
    </CharacterProvider>
  )
}
