import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import DashboardContext from '../../Context/DashboardContext';

const LOGO = styled.div`
  font-size: 1.5em;
`;

const NAVBAR = styled.div`
  display: grid;
  grid-template-columns: 180px auto 100px 100px 100px 100px;
`;

const LinkStyle = styled.p`
  color: white;
  text-decoration: none;
  ${(props) =>
    props.active &&
    css`
      text-shadow: 0px 0px 20px #03ff03;
    `}
`;

const Navbar = ({ location }) => {
  const dashboardContext = useContext(DashboardContext);
  const { page } = dashboardContext;

  return (
    <NAVBAR>
      <LOGO>CD</LOGO>
      <div></div>
      <Link to='/'>
        <LinkStyle active={'/' === page ? true : false}>Home</LinkStyle>
      </Link>
      <Link to='/dashboard'>
        <LinkStyle active={'/dashboard' === page ? true : false}>
          Dashboard
        </LinkStyle>
      </Link>
      <Link to='/settings'>
        <LinkStyle active={'/settings' === page ? true : false}>
          Settings
        </LinkStyle>
      </Link>
      <Link to='/about'>
        <LinkStyle active={'/about' === page ? true : false}>About</LinkStyle>
      </Link>
    </NAVBAR>
  );
};

export default Navbar;
