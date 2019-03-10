import React, { Component } from 'react';
//import logo from './logo.svg';
import BasicExample from './routes';

import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <BasicExample />
        <footer className="app-footer">
          <b>&copy; Copyrights<span> 2018</span></b>
        </footer>
      </div>
    );
  }
}

export default App;
