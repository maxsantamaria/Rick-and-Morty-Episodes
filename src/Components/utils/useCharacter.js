import React, {useState, useEffect} from 'react';
import axios from 'axios';


const useCharacter = (ids) => {
  console.log(ids)
  const [character, setCharacter] = useState([])
  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character/' + ids)
      .then(res => {
        console.log(res)
        setCharacter(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return character;
}

export default useCharacter;