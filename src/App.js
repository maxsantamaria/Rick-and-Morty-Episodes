import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import EpisodesFetching from "./Components/EpisodesFetching"
import Episode from "./Components/Episode"
import Character from "./Components/Character"
import Location from "./Components/Location"
import Navbar from "./Components/Navbar"
import Search from "./Components/Search"

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/' component={EpisodesFetching} />
          <Route exact path='/episode/:id' render={(props) => <Episode {...props} />} />
          <Route exact path='/character/:id' render={(props) => <Character {...props} />} />
          <Route exact path='/location/:id' render={(props) => <Location {...props} />} />
          <Route exact path='/search' render={(props) => <Search {...props} />} /> 

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;


/*
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/projects/ProjectDetails'
import SignedIn from './components/auth/SignedIn'
import SignedUp from './components/auth/SignedUp'
import CreateProject from './components/projects/CreateProject'



function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/project/:id' component={ProjectDetails} />
          <Route path='/signin' component={SignedIn} />
          <Route path='/signup' component={SignedUp} />
          <Route path='/create' component={CreateProject} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
*/