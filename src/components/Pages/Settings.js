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
  }, []);

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
    margin: var(--m-length-l);
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

  const CoinGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    text-align: center;
    margin: 20px 10px;
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
    margin: var(--m-length-l);
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
    console.log('CoinGrid Started');

    //Infinite Scroll

    let coins;

    if (filtered !== null) {
      coins = Object.keys(filtered);
    } else {
      coins = Object.keys(coinList);
    }

    console.log(coins);

    let coinIndex = 91;

    window.addEventListener('scroll', () => {
      const {
        scrollHeight,
        scrollTop,
        clientHeight,
      } = document.documentElement;

      if (scrollTop + clientHeight > scrollHeight - 5) {
        <Spinner />;
        setTimeout(createCoinGrid(coinIndex), 2000);
      }
    });

    function createCoinGrid(coinIndex) {
      let i;
      if (coinIndex + 90 < coins.length) {
        for (i = coinIndex; i < coinIndex + 91; i++) {
          createCoinCard(coins[i]);
        }
        coinIndex += i;
      }
    }

    function createCoinCard(coinKey) {
      const container = document.querySelector('#coinGridContainer');
      const coinCard = document.createElement('div');
      coinCard.className = 'card-dark';
      coinCard.innerHTML = `${coinKey}`;
      container.appendChild(coinCard);
    }

    //Infinite Scroll Over

    return (
      <Fragment>
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
        <CoinGrid id='coinGridContainer'>
          {coins.slice(0, 90).map((coinKey) => (
            <div className='card-dark'>{coinKey}</div>
          ))}
        </CoinGrid>
      </Fragment>
    );
  }
};

export default Settings;
