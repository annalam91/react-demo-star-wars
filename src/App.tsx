import React from 'react';
import logo from './logo.svg';
import './App.css';
import StarWarsCharacters from './components/StarWarsCharacters';
import { StarWarsEncounter } from './components/StarWarsEncounter';

  function App() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {/* <StarWarsCharacters /> */}
        <StarWarsEncounter />
      </div>
    );
  }
  
export default App;
