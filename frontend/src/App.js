import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/common/header";
import Footer from "./components/common/footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>

        <Footer/>
      </div>
    );
  }
}

export default App;
