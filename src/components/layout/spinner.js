import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <div class='spinner' id='loader'>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Spinner;
