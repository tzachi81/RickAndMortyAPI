import { useState } from 'react'
import { ReactComponent as Logo } from './logo.svg'
import './app.css'
import CharacterLoader from './components/CharacterLoader/CharacterLoader'
import { CharacterProvider } from './Context/CharacterContext'
import CharacterTable from './components/CharacterTable/CharacterTable'

export function App () {
  return (
    <CharacterProvider>
      <div>
        <h1>Rick and Morty Character Loader</h1>
        <CharacterLoader />
        <CharacterTable />
      </div>
    </CharacterProvider>
  )
}
