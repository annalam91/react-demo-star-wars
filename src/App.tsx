import React from 'react';
import logo from './logo.svg';
import './App.css';
import { StarWarsEncounter } from './components/StarWarsEncouter';

  function App() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <StarWarsEncounter />
      </div>
    );
  }
  
export default App;
