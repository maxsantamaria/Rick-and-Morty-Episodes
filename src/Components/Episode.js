import React, {useState, useEffect} from 'react';
import axios from 'axios';
import useCharacter from './utils/useCharacter'
import { Link } from 'react-router-dom'
import { URL } from './utils'




const Episode = (props) => {
  const id = props.match.params.id;
  const [episode, setEpisode] = useState([])
  const [characters, setCharacters] = useState([])
  useEffect(() => {
    var list = []
    axios.get(URL + 'episode/' + id)
      .then(res => {
        console.log(res.data.characters)
        setEpisode(res.data)
        //setCharacters(res.data.characters)
        
        for (const index in res.data.characters) {
          const url = res.data.characters[index]
          const id = url.slice(url.lastIndexOf("/") + 1)
          list = [... list,  id]
          
        }
        axios.get(URL + 'character/' + list)
          .then(res => {
            console.log(res)
            setCharacters(res.data)
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
    
  }, [])

  return (
    
    <div>
      <table>
        <thead>

          <tr>
            <th>Nombre</th>
            <th>Fecha al aire</th>
            <th>Código de episodio</th>
            <th>Personajes</th>
          </tr>
        </thead>
        <tbody>
        <tr key={episode.id}>
          <td>{episode.name}</td>
          <td>{episode.air_date}</td>
          <td>{episode.episode}</td>
          <td>

            {characters.map(character => (
              <div key={ character.id }><Link to={'/character/' + character.id} key={ character.id }>{character.name}</Link></div>
            ))}

          </td>
        </tr>
          
        </tbody>

      </table>
      
    </div>
  )
}

const getIDFromUrl = (url) =>{

}


export default Episode