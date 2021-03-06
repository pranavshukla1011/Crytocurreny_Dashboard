import React, { Fragment, useContext } from 'react';
import CoinPriceChart from '../Chart/CoinPriceChart';
import DashboardContext from '../../Context/DashboardContext';
import styled from 'styled-components';
import Spinner from '../layout/spinner';

const MainGrid = styled.div`
  display: flex;
  flex-direction: column;

  background-color: var(--dark-color-2);
`;

const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  text-align: center;
  margin: 20px 10px;
`;

const FavouriteCoin = styled.div`
  box-shadow: 0px 0px 1px 1px var(--main-color-pink);
`;

const FavouriteDeleteButton = styled.button`
  text-align: center;
  margin: 5px 5px;
  padding: 3px 10px;
  background-color: var(--font-color-1);
  border-style: none;
  cursor: pointer;
  border: 1px solid transparent;
  transition-property: animation, background-color, transform;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  &:hover {
    background-color: var(--font-color-2);
    animation: animate3 5s infinite alternate;
    transform: scale(1.1, 1.1);
  }
  border-radius: var(--m-length-m);
`;

const MainDisplay = () => {
  const dashboardContext = useContext(DashboardContext);
  const {
    favourites,
    dashboardFavourites,
    setDashboardFavourites,
    coinHistory,
    setSeries,
  } = dashboardContext;

  const onClickDelete = (e) => {
    let currentDashboard = JSON.parse(localStorage.getItem('dashboardCurrent'));

    currentDashboard = currentDashboard.filter(
      (coinKey) => coinKey.toString() !== e.target.id.toString()
    );
    if (currentDashboard.length !== 0) {
      localStorage.setItem(
        'dashboardCurrent',
        JSON.stringify(currentDashboard)
      );
    } else {
      localStorage.setItem('dashboardCurrent', JSON.stringify(null));
    }
    setDashboardFavourites();
    setSeries();
  };

  const MainCoins = () => {
    // for (let i = 0; i < favourites.length; i++) {
    //   favCoins[Object.keys(favourites[i])] = Object.values(favourites[i])[0];
    // }

    const favCoins = {};

    for (let i = 0; i < favourites.length; i++) {
      favCoins[Object.keys(favourites[i])] = Object.values(favourites[i])[0];
    }

    return (
      <Fragment>
        <CoinGrid>
          {dashboardFavourites.map((coinKey) => (
            <FavouriteCoin className='coin-light' key={favCoins[coinKey].Id}>
              <div className='coin-grid'>
                <div>{favCoins[coinKey].CoinName}</div>
                <div style={{ justifySelf: 'right' }}>
                  {favCoins[coinKey].Symbol}
                </div>
              </div>

              <img
                style={{ height: '70px', margin: '10px 0' }}
                src={`http://cryptocompare.com/${favCoins[coinKey].ImageUrl}`}
                alt='<coin pic>'
              />
              <div></div>
              <FavouriteDeleteButton id={coinKey} onClick={onClickDelete}>
                Delete
              </FavouriteDeleteButton>
            </FavouriteCoin>
          ))}
        </CoinGrid>
      </Fragment>
    );
  };

  const DataChart = () => {
    return (
      <Fragment>
        <div>
          <CoinPriceChart></CoinPriceChart>
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      {dashboardFavourites !== null ? (
        <Fragment>
          <MainGrid>
            <MainCoins></MainCoins>
            {coinHistory !== null ? (
              <Fragment>
                <DataChart></DataChart>
              </Fragment>
            ) : (
              <Fragment>
                <Spinner></Spinner>
              </Fragment>
            )}
          </MainGrid>
        </Fragment>
      ) : (
        <div style={{ textAlign: 'center' }} className='card-dark'>
          <h3>You have no main coins selected...</h3>
        </div>
      )}
    </Fragment>
  );
};

export default MainDisplay;
