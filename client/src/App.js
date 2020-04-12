import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat';
import Join from './components/Join';

function App() {
  return (
    <Router>
      <div className='App'>
        <Route exact path='/' component={Join} />
        <Route exact path='/chat' component={Chat} />
      </div>
    </Router>
  );
}

export default App;
