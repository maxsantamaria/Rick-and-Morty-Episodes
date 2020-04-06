import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { URL } from './utils'


const Location = (props) => {
  const id = props.match.params.id;
  const [location, setLocation] = useState([])
  const [characters, setCharacters] = useState([])
  useEffect(() => {
    axios.get(URL + 'location/' + id)
      .then(res => {
        console.log(res)
        setLocation(res.data)

        var characters_ids = []
        for (const index in res.data.residents) {
          const url = res.data.residents[index]
          const id = url.slice(url.lastIndexOf("/") + 1)
          characters_ids = [... characters_ids,  id]
        }
        console.log(characters_ids)
        axios.get(URL + 'character/' + characters_ids)
          .then(res => {
            if (characters_ids.length > 1){
              setCharacters(res.data)
            }
            else{
              setCharacters([res.data])
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
  }, [])

  
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Dimension</th>
            <th>Residentes</th>
          </tr>
        </thead>
        <tbody>
          <tr key={location.id}>
            <td>{location.name}</td>
            <td>{location.type}</td>
            <td>{location.dimension}</td>
            <td>
              {characters.map(character => (
                <div key={character.id}><Link to={'/character/' + character.id} key={character.id}>{character.name}</Link></div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}


export default Location