import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router>
        <div className='app'>
          <Header/>
          <Home/>
        </div>
    </Router>
  );
}
export default App;
