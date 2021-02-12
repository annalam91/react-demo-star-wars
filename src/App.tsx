import React from 'react';
import logo from './logo.svg';
import './App.css';
import StarWarsCharacters from './components/StarWarsCharacters';

  function App() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <StarWarsCharacters />
      </div>
    );
  }
  
export default App;
