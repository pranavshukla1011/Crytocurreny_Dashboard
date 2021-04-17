import './App.css';
import React from 'react';
import DashboardState from './Context/DashboardState';

import AppLayout from './components/layout/AppLayout';
import Navbar from './components/layout/Navbar';

import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Settings from './components/Pages/Settings';
import Dashboard from './components/Pages/Dashboard';
import Error from './components/Pages/Error';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <DashboardState>
        <AppLayout>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/dashboard' component={Dashboard}></Route>
            <Route exact path='/settings' component={Settings}></Route>
            <Route exact path='/about' component={About}></Route>
            <Route component={Error}></Route>
          </Switch>
        </AppLayout>
      </DashboardState>
    </Router>
  );
};

export default App;
