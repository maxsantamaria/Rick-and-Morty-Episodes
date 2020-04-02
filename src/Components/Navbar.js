import React, {useState, useEffect}  from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';



const Navbar = (props) => {
  const [search, setSearch] = useState('')
  const [redirect, setRedirect] = useState(false)
  useEffect(() => {
    return () => {
      setRedirect(false)
      setSearch('')
    };
  }, [redirect])

  const HandleEnter = (e) => {
    if (e.key == 'Enter') {
      setRedirect(true)
    }
  }



  return (
    <div className="container" style={{width: '100%', backgroundColor: 'black', textAlign: 'right', padding: '10px'}}>
      <div style={{textAlign: 'left'}}>
        <Link to='/'>Home</Link>
      </div>
      <div style={{textAlign: 'right'}}>
        <input 
          type='text' 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          placeholder="Búsqueda"
          onKeyDown={e => HandleEnter(e)}
        />
        {redirect ? <Redirect to={{pathname: "/search", name: search}} /> : null}
      </div>
    </div>

  )
}

export default Navbar;