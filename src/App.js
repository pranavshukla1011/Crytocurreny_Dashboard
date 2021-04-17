import './App.css';
import React, { Fragment } from 'react';
import AppLayout from './components/layout/AppLayout';
import Navbar from './components/layout/Navbar';

const App = () => {
  return (
    <Fragment>
      <AppLayout>
        <Navbar />
        <h1>Cryptocurrency Dashboard</h1>
      </AppLayout>
    </Fragment>
  );
};

export default App;
