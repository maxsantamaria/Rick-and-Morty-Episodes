import React, {useState, useEffect} from 'react';
import axios from 'axios';
import useCharacter from './utils/useCharacter'
import { Link } from 'react-router-dom'


const Character = (props) => {
  const id = props.match.params.id;
  const [character, setCharacter] = useState([])
  const [location, setLocation] = useState('')
  const [origin, setOrigin] = useState('')
  const [episodes, setEpisodes] = useState([])
  const [idOrigin, setIdOrigin] = useState('')
  const [idLocation, setIdLocation] = useState('')
  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character/' + id)
      .then(res => {
        console.log(res.data)
        setCharacter(res.data)
        setOrigin(res.data.origin)
        setIdOrigin(res.data.origin.url.slice(res.data.origin.url.lastIndexOf("/") + 1))
        setLocation(res.data.location)
        setIdLocation(res.data.location.url.slice(res.data.location.url.lastIndexOf("/") + 1))
        
        var episode_ids = []
        for (const index in res.data.episode) {
          const url = res.data.episode[index]
          const id = url.slice(url.lastIndexOf("/") + 1)
          episode_ids = [... episode_ids,  id]          
        }
        axios.get('https://rickandmortyapi.com/api/episode/' + episode_ids)
          .then(res => {
            console.log(res)
            if (episode_ids.length > 1){
              setEpisodes(res.data)
            }
            else{
              setEpisodes([res.data])
            }
          }
        )

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
            <th>Status</th>
            <th>Especie</th>
            <th>Tipo</th>
            <th>Género</th>
            <th>Origen</th>
            <th>Imagen</th>
            <th>Lugar actual</th>
            <th>Episodios</th>
          </tr>
        </thead>
        <tbody>
          <tr key={character.id}>
            <td>{character.name}</td>
            <td>{character.status}</td>
            <td>{character.species}</td>
            <td>{character.type}</td>
            <td>{character.gender}</td>
            <td><Link to={'/location/' + idOrigin} key={idOrigin}> {origin.name} </Link></td>
            <td><img src={character.image}/></td>
            <td><Link to={'/location/' + idLocation} key={idLocation}> {location.name} </Link></td>
            <td>
              {episodes.map(episode => (
                <div key={ episode.id }><Link to={'/episode/' + episode.id } key={episode.id}>{episode.name}</Link></div>
              ))}
            </td>
          </tr>
          
        </tbody>

      </table>
    </div>
  )
}


export default Character