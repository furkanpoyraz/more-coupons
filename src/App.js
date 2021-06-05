import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navigation from './components/Navigation';
import Home from './components/Home';
import Panel from './components/Panel';

function App() {
  return (
    <div className="app">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/panel">
            <Panel />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
