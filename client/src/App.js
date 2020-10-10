import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Search from './components/Search';
import History from './components/History';


function App() {
  return (
    <Router className='App'>
      <br />
      <br />
      <br />
      <br />
      <Route path="/" exact component={Search} />
      <Route path="/:id" component={History} />
    </Router>
  );
}

export default App;
