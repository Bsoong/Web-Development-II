import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Berries from './components/berries'
import Pokemon from './components/pokemon'
import Machines from './components/machines'
import Background from './components/background'

const routing = (
  <Router>
    <div>
      <Route exact path="/" render={() => <div>Home</div>} component={App} />
      <Route path="/pokemon/page/:page"  component={Pokemon} />
      <Route path="/berries/page/:page"  component={Berries} />
      <Route path="/machines/page/:page" component={Machines} />
      <Route path= "/background" component={Background}/>
    </div>
  </Router>
  
)



ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
