import React, { Component } from 'react';
import logo from '../../../src/logo.svg';
import './App.css';
import Header from '../../components/Header/Header.js';
import Rodape from '../../components/Rodape/Rodape.js';
import Banner from '../../assets/img/Banner.jpg';
import "../../assets/css/home.css";
 


class App extends Component {
  render() {
    return (
      <div className="App">
      <Header/>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
        </header> */}
        <div id="filtro">
          <img id="imgBanner" src={Banner}/>
        </div>
        <Rodape/>
      </div>
    );
  }
}

export default App;
