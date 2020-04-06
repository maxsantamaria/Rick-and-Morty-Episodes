import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './components.modules.css'
import { Link } from 'react-router-dom'
import { URL } from './utils'

const EpisodesFetching = () => {
  const [episodes, setEpisodes] = useState([]);
  const [url, setUrl] = useState(URL + 'episode');

  useEffect(() => {
    if (url != "") {
      axios.get(url)
        .then(res => {
          console.log(res)
          setEpisodes(episodes.concat(res.data.results))
          setUrl(res.data.info.next)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [url])


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha al aire</th>
            <th>Código de episodio</th>
          </tr>
        </thead>
        <tbody>
        {
          episodes.map(episode => (
            <tr key={episode.id}>
              <td><Link to={'/episode/' + episode.id} key={ episode.id }>{episode.name}</Link></td>
              <td>{episode.air_date}</td>
              <td>{episode.episode}</td>
            </tr>
          ))
        }
        </tbody>

      </table>
    </div>
  )
}


export default EpisodesFetching