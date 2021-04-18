import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import DashboardContext from '../../Context/DashboardContext';

// animation: name duration timing-function delay iteration-count direction fill-mode play-state;

const Logo = styled.div`
  font-size: var(--m-length-l);
  animation: animate1 1.5s infinite alternate;
`;

const NavBar = styled.div`
  display: grid;
  grid-template-columns: 4fr auto 1fr 1fr 1fr 1fr;
  align-items: center;
  background-color: var(--dark-color-1);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--main-color-purple);
  margin: var(--s-length-m);
  text-align: center;
  transition: all 250ms ease-in-out;
  ${(props) =>
    props.active === true &&
    css`
      border-width: 0px
        ${(props) => (props.tab === '/about' ? css`2px` : css`0px`)} 2px
        ${(props) => (props.tab === '/' ? css`2px` : css`0px`)};
      border-color: var(--main-color-purple);
      border-radius: var(--m-length-m);
      border-style: solid;
      padding: 2px 0px;
      color: var(--font-color-3);
    `};
`;

const Navbar = ({ location }) => {
  const dashboardContext = useContext(DashboardContext);
  const { page } = dashboardContext;

  return (
    <NavBar className='container'>
      <Logo>
        <i className='fab fa-bitcoin'></i> CD
      </Logo>
      <div></div>
      <StyledLink to='/' active={'/' === page ? true : false} tab={page}>
        <p> Home </p>
      </StyledLink>
      <StyledLink
        to='/dashboard'
        active={'/dashboard' === page ? true : false}
        tab={page}
      >
        <p> Dashboard </p>
      </StyledLink>
      <StyledLink
        to='/settings'
        active={'/settings' === page ? true : false}
        tab={page}
      >
        <p> Settings </p>
      </StyledLink>
      <StyledLink
        to='/about'
        active={'/about' === page ? true : false}
        tab={page}
      >
        <p> About </p>
      </StyledLink>
    </NavBar>
  );
};

export default Navbar;
