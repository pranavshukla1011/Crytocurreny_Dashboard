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
    current,
  } = dashboardContext;

  useEffect(() => {
    setPage(location.pathname);
    // eslint-disable-next-line
    if (filtered === null) {
      text = '';
      setFilterText('');
    }
    setCoinList();
    localStorage.setItem('firstVisit', JSON.stringify(false));
    setFirstVisit();
  }, []);

  const StyledLink = styled.div`
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
    cursor: pointer;
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
    if (current.length === 0) setValueInLocalStorage(null);
    else
      setValueInLocalStorage(
        current.map((coinKey) => {
          return {
            [coinKey]: coinList[coinKey],
          };
        })
      );

    setFavourites();
    localStorage.setItem('firstVisit', JSON.stringify(false));
    setFirstVisit();
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
        {favourites !== null ? (
          <FavouriteCoins></FavouriteCoins>
        ) : (
          <div style={{ textAlign: 'center' }} className='card-dark'>
            <h3>You have no favourites...</h3>
          </div>
        )}
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
          {firstVisit ? (
            <h3>Choose coin(s) from the menu below and lets get started....</h3>
          ) : (
            <h3>
              Select a currency from below and click the button to modify your
              favourites...
            </h3>
          )}
          <br />
          <StyledLink onClick={onClick}>
            {favourites === null ? 'Confirm Favourites !' : 'Edit Favourites!'}
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
