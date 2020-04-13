import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Chat from './components/chat/Chat';
import Join from './components/join/Join';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Join} />
          <Route exact path='/chat' component={Chat} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
