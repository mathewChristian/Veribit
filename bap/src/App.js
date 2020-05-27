import React from 'react';
import 'typeface-roboto';
//import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from "./components/Nav";
import About from "./components/About";
import BitIndex from "./components/BitIndex";
import Bap from "./components/Bap"

import './App.css';

//function App() {
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <Nav />
          <Switch>
            <Route path="/" exact component={About} />
            <Route path="/bitindex" component={BitIndex} />
            <Route path="/bap" component={Bap} />
          </Switch>
        </div>
      </Router >
    );
  }
}

export default App;
