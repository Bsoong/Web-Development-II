import React, {Component} from 'react';
import logo from './pokeball.png';
import './App.css';
import { Link ,Route, Switch,  BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import * as serviceWorker from './serviceWorker';
import BerriesContainer from './components/Berries/BerriesContainer'
import PokemonContainer from './components/Pokemon/PokemonContainer'
import MachinesContainer from './components/Machines/MachinesContainer'
import Navigation from './index'
import Pagination from 'react-bootstrap/Pagination'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function App() {

  return (
    <div className ="NavigationBar">
    <Navbar bg="light" variant="primary">
  <Navbar.Brand>The CS-554 Pokedex!</Navbar.Brand>
  <Nav className="mr-auto">
    <Nav.Link href="/">Home</Nav.Link>
    <Nav.Link href="/pokemon/page/0">Pokemon</Nav.Link>
    <Nav.Link href="/berries/page/0">Berries</Nav.Link>
    <Nav.Link href="/machines/page/0">Machines</Nav.Link>
  </Nav>
</Navbar>
    <div className="App">
      <Router>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className = "bio">
          Welcome to the Pokedex HelpSite! Here you'll find great resources to help you on your journey through Palette town and beyond. Click on one of the topics up top to start! After that, scroll down to learn more :-) 
        </p>
      </header>
      <div className = "app-body">
        <Switch>
        <Route path="/pokemon"  component={PokemonContainer} />
        <Route path="/berries"  component={BerriesContainer} />
        <Route path="/machines" component={MachinesContainer} />
        </Switch>
      </div>
    </Router>
    </div>
    </div>
  );
}
