import React, {
  useContext,
  useEffect,
  useState,
  Fragment,
  useRef,
} from 'react';
import DashboardContext from '../../Context/DashboardContext';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Spinner from '../layout/spinner';
import Coins from '../Coins/Coins';
import FavouriteCoins from '../Coins/FavouriteCoins';
const Settings = ({ location }) => {
  const dashboardContext = useContext(DashboardContext);

  const {
    favourites,
    firstVisit,
    setPage,
    setFavourites,
    setFirstVisit,
    setCoinList,
    coinList,
    filtered,
    filterCoins,
    clearFilter,
    setFilterText,
  } = dashboardContext;

  useEffect(() => {
    setPage(location.pathname);
    // eslint-disable-next-line
    if (filtered === null) {
      text = '';
      setFilterText('');
    }
    setCoinList();
  }, [firstVisit]);

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: var(--font-color-3);
    animation: animate3 5s infinite alternate;
    border-radius: var(--m-length-m);
    padding: 10px;
    font-size: var(--m-length-m);
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
    animation: animate3 5s infinite alternate;
    align-items: center;
    justify-content: center;
    color: var(--font-color-3);
    margin: 20px 10px;
    & h1 {
      font-size: var(--l-length-m);
    }

    & h2 {
      font-size: var(--l-length-s);
    }

    & h3 {
      margin: var(--m-length-m) 0 0 0;
      font-size: var(--m-length-l);
    }
  `;

  const SpinnerDiv = styled.div`
    display: grid;
    align-items: center;
    justify-content: center;
    height: 60vh;
  `;

  const StyledInputSubmit = styled.input`
    text-decoration: none;
    color: var(--font-color-3);
    animation: animate3 5s infinite alternate;
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
    background-color: inherit;
    cursor: pointer;
  `;

  const Filter = styled.form`
    display: grid;
    padding: 0 40px;
    grid-template-columns: 6fr 1fr 2fr;
    margin: 20px 10px;
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

  let text = useRef('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.current.value !== '') {
      filterCoins(text.current.value);
      setFilterText(text.current.value);
    } else {
      clearFilter();
    }
  };

  if (!coinList) {
    return (
      <Fragment>
        <SpinnerDiv>
          <Spinner></Spinner>
        </SpinnerDiv>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {favourites !== null ? (
          <FavouriteCoins></FavouriteCoins>
        ) : (
          <div style={{ textAlign: 'center' }} className='card-dark'>
            <h3>You have no favourites...</h3>
          </div>
        )}

        <MainDiv className='card-dark'>
          <h3>
            Choose a Currency from the menu below and lets get started....
          </h3>
          <br />
          <StyledLink onClick={onClick} to='/dashboard'>
            {firstVisit ? 'Get Started !' : 'Continue!'}
          </StyledLink>
        </MainDiv>

        <Filter action='' onSubmit={onSubmit}>
          <input
            ref={text}
            type='text'
            name='text'
            placeholder='Filter Coins...'
            id='filterCoins'
          />
          <div></div>
          <StyledInputSubmit type='submit' value='Filter' />
        </Filter>
        <Coins />
      </Fragment>
    );
  }
};

export default Settings;
