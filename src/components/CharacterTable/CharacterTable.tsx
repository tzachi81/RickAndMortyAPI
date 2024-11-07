import React from 'react'
import { useCharacterContext } from '../../Context/CharacterContext'

const CharacterTable: React.FC = () => {
  const { characters } = useCharacterContext()

  if (characters.length === 0) {
    return <p>No character data available. Try to refresh the page.</p>
  }

  return (
    <div>
      <h2>Character Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>STATUS</th>
            <th>SPECIES</th>
            <th>TYPE</th>
            <th>GENDER</th>
            <th>ORIGIN</th>
            <th>LOCATION</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <tr key={character.id}>
              <td>{character.id}</td>
              <td>{character.name}</td>
              <td>{character.status}</td>
              <td>{character.species}</td>
              <td>{character.type}</td>
              <td>{character.gender}</td>
              <td>{character.origin.name}</td>
              <td>{character.location.name}</td>
              <td>
                <img src={character.image} alt={character.name} style={{ width: '50px', height: 'auto' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CharacterTable
