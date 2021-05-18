import React from 'react';
import './App.css';
import PeopleMaster from './components/people-master/PeopleMaster';
import PeopleDetails from './components/people-details/PeopleDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class App extends React.Component {

  render() {
    return (
        <div className="App">

      <Router>
      <header>
      <Link to="/"><h1>One step forward</h1></Link>
        
        <p>A fake health app</p>
      </header>

          <Switch>
          
            <Route path="/:id">
              <PeopleDetails />
            </Route>

            <Route path="/">
              <PeopleMaster />
            </Route>
          
          </Switch>

      </Router>

      <footer>
      <p>
        Alexandre Leroux - Enseignant à l'Université de Lorraine - IUT Nancy Charlemagne (LP CIASIE) - IDMC (Master Sciences Cognitives)
      </p>
      <p>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
      </footer>
        </div>
    );
  }

}
