import React, { useContext, useEffect } from 'react';
import DashboardContext from '../../Context/DashboardContext';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Settings = ({ location }) => {
  const dashboardContext = useContext(DashboardContext);

  const {
    favourites,
    firstVisit,
    setPage,
    setFavourites,
    setFirstVisit,
  } = dashboardContext;

  useEffect(() => {
    setPage(location.pathname);
    // eslint-disable-next-line
  }, []);

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: var(--font-color-3);
    border: 2px solid var(--main-color-purple);
    border-radius: var(--m-length-m);
    padding: 10px;
    font-size: var(--m-length-l);
    // text-shadow: 0px 0px var(--s-length-l) var(--main-color-pink);
    transition-property: transform, color;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
    &:hover {
      transform: scale(1.1, 1.1);
      color: var(--font-color-2);
    }
  `;

  const MainDiv = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    // border: 2px solid white;
    height: 60vh;
    align-items: center;
    justify-content: center;
    color: var(--font-color-3);

    & h1 {
      font-size: var(--l-length-m);
    }

    & h2 {
      font-size: var(--l-length-s);
    }

    & h3 {
      margin: var(--m-length-m) 0 0 0;
      font-size: var(--m-length-m);
    }
  `;

  const setValueInLocalStorage = (value) => {
    localStorage.setItem('cryptoData', JSON.stringify(value));
  };

  const onClick = () => {
    if (favourites === null) {
      setValueInLocalStorage({ test: 'hello world' });
      setFavourites();
      setFirstVisit(false);
    } else {
      setFavourites();
      setFirstVisit(false);
    }
  };

  return (
    <MainDiv>
      <StyledLink
        onClick={onClick}
        to={firstVisit ? '/settings' : '/dashboard'}
      >
        {firstVisit ? 'Get Started !' : 'Continue!'}
      </StyledLink>
    </MainDiv>
  );
};

export default Settings;
