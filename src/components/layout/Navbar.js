import React from 'react';
import styled from 'styled-components';

const NAVBAR = styled.div`
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
`;

const Navbar = () => {
  return (
    <NAVBAR>
      <div>CD</div>
      <div></div>
      <div>Dashboard</div>
      <div>Settings</div>
    </NAVBAR>
  );
};

export default Navbar;
