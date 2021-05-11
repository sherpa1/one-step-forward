import React from 'react';
import './App.css';
import PeopleMaster from './components/people-master/PeopleMaster';

export default class App extends React.Component{

  render(){
    return (
      <div className="App">
        <PeopleMaster/>
      </div>
    );
  }

}
