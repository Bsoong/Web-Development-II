import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link ,Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import * as serviceWorker from './serviceWorker';
import Berries from './components/berries'
import Pokemon from './components/pokemon'
import Machines from './components/machines'
import Background from './components/background'
import Navigation from './index'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pokemon/page/:page">Pokemon</Link>
          </li>
          <li>
            <Link to="/berries/page/:page">Berries</Link>
          </li>
          <li>
            <Link to="/machines/page/:page">Machines</Link>
          </li>
        </ul>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
