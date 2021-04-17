import React from 'react';
import styled, { css } from 'styled-components';

const LOGO = styled.div`
  font-size: 1.5em;
`;

const NAVBAR = styled.div`
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
`;

const ControlButtonElem = styled.div`
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      text-shadow: 0px 0px 20px #03ff03;
    `}
`;

const toProperCase = (lower) => lower.charAt(0).toUpperCase() + lower.slice(1);

const CONTROL_BUTTON = ({ name, active }) => {
  return (
    <ControlButtonElem active={active}>{toProperCase(name)}</ControlButtonElem>
  );
};

const Navbar = () => {
  return (
    <NAVBAR>
      <LOGO>CD</LOGO>
      <div></div>
      <CONTROL_BUTTON name='dashboard' active />
      <CONTROL_BUTTON name='settings' />
    </NAVBAR>
  );
};

export default Navbar;
