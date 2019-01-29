import React, { Component } from 'react';
import './App.css';
import LoginForm from "./components/loginForm";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem('auth')){
      window.location = "/movies";
    }
  }

  render() {
    return (
      <div className="App">
        <LoginForm/>
      </div>
    );
  }
}

export default App;
