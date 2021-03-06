import React, { useContext, useEffect, Fragment, useRef } from 'react';
import DashboardContext from '../../Context/DashboardContext';
import styled from 'styled-components';
import Spinner from '../layout/spinner';
import Coins from '../Coins/Coins';
import FavouriteCoins from '../Coins/FavouriteCoins';
import FilteredCoins from '../Coins/FilteredCoins';
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
  padding-bottom: 40px;
  align-items: center;
  justify-content: center;
  color: var(--font-color-3);
  margin: 20px 10px;
  & h1 {
    font-size: var(--l-length-m);
    margin: 5px 0;
  }

  & h2 {
    font-size: var(--l-length-s);
    margin: 5px 0;
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
  height: 40vh;
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
  grid-template-columns: 4fr 1fr 1fr;
  justify-content: space-around;
  margin: 20px 10px;
`;

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
    clearFilterText,
    setFilterText,
    current,
    setPrices,
  } = dashboardContext;

  useEffect(() => {
    setPage(location.pathname);
    // eslint-disable-next-line
    if (filtered === null) {
      // eslint-disable-next-line
      text = '';
      clearFilterText();
    }
    setCoinList();
    localStorage.setItem('firstVisit', JSON.stringify(false));

    setFirstVisit();
  }, []);

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
    setPrices();
    localStorage.setItem('firstVisit', JSON.stringify(false));
    localStorage.setItem('dashboardCurrent', JSON.stringify(null));
    setFirstVisit();
  };

  let text = useRef('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.current.value !== '') {
      setFilterText(text.current.value);
      const loader = document.querySelector('#loader');
      loader.style.display = 'block';
      let coins = Object.keys(coinList);

      coins = coins.filter(
        (key) =>
          coinList[key].CoinName.toString()
            .toLowerCase()
            .includes(text.current.value) ||
          coinList[key].Symbol.toString()
            .toLowerCase()
            .includes(text.current.value) ||
          coinList[key].FullName.toString().includes(text.current.value) ||
          coinList[key].Name.toString().includes(text.current.value)
      );
      loader.style.display = 'none';
      filterCoins(coins);
    } else {
      clearFilterText();
      filterCoins(null);
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
          <h1>Fetching Coins....please wait.</h1>
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

        {filtered !== null && filtered.length !== 0 ? (
          <Fragment>
            <div id='loader' style={{ display: 'none' }}>
              <Spinner></Spinner>
            </div>
            <FilteredCoins></FilteredCoins>
          </Fragment>
        ) : (
          <Fragment />
        )}
        <Coins />
      </Fragment>
    );
  }
};

export default Settings;
