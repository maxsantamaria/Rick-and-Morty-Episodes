import React, {useState, useEffect}  from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { URL } from './utils'


export default function Search(props) {
  //console.log(props.location.name)
  const name = props.location.name
  console.log(name)
  const [episodes, setEpisodes] = useState([])
  const [url, setUrl] = useState(URL + 'episode/?name=' + name);
  useEffect(() => {
    if (url != "") {
      axios.get(url)
        .then(res => {
          setEpisodes(episodes.concat(res.data.results))
          setUrl(res.data.info.next)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [url])
  const [characters, setCharacters] = useState([])
  const [url_char, setUrl_char] = useState(URL + 'character/?name=' + name);
  useEffect(() => {
    if (url_char != "") {
      axios.get(url_char)
        .then(res => {
          setCharacters(characters.concat(res.data.results))
          setUrl_char(res.data.info.next)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [url_char])

  const [locations, setLocations] = useState([])
  const [url_loc, setUrl_loc] = useState(URL + 'location/?name=' + name);
  useEffect(() => {
    if (url_loc != "") {
      axios.get(url_loc)
        .then(res => {
          setLocations(locations.concat(res.data.results))
          setUrl_loc(res.data.info.next)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [url_loc])

  useEffect(() => {
    return () => {
      window.location.reload()
    };
  }, [name])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Episodios</th>
            <th>Personajes</th>
            <th>Lugares</th>
          </tr>
        </thead>
        <tbody>
        <tr key={name}>
          <td>
            {episodes.map(episode => (
              <div key={ episode.id }><Link to={'/episode/' + episode.id} key={ episode.id }>{episode.name}</Link></div>
            ))}
          </td>
          <td>
            {characters.map(character => (
              <div key={ character.id }><Link to={'/character/' + character.id} key={ character.id }>{character.name}</Link></div>
            ))}
          </td>
          <td>
            {locations.map(location => (
              <div key={ location.id }><Link to={'/location/' + location.id} key={ location.id }>{location.name}</Link></div>
            ))}
          </td>
        </tr>
        </tbody>

      </table>
    </div>
  )
}
