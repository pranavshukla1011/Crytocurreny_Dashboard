import React, { useContext, useEffect, Fragment } from 'react';
import DashboardContext from '../../Context/DashboardContext';
import Spinner from '../layout/spinner';
import CoinPriceChart from '../Chart/CoinPriceChart';
import styled, { css } from 'styled-components';

const Dashboard = ({ location }) => {
  const dashboardContext = useContext(DashboardContext);
  const {
    firstVisit,
    prices,
    setPage,
    setFirstVisit,
    favourites,
    setFavourites,
    setPrices,
  } = dashboardContext;

  console.log('Dashboard Grid Started');

  const CoinGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    justify-conten: center;
    align-items: center;
  `;

  const PriceCoin = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    box-shadow: 0px 0px 1px 1px var(--main-color-pink);
    justify-conten: center;
    align-items: center;
    ${(props) => {
      return (
        props.priceHr < 0
          ? css`
              & p {
                color: red;
                opacity: 0.7;
              }
            `
          : css`
              & p {
                color: green;
              }
            `,
        props.priceMn < 0
          ? css`
              & p {
                color: red;
                opacity: 0.7;
              }
            `
          : css`
              & p {
                color: green;
              }
            `,
        props.priceYr < 0
          ? css`
              & p {
                color: red;
                opacity: 0.7;
              }
            `
          : css`
              & p {
                color: green;
              }
            `
      );
    }}
  `;

  useEffect(() => {
    setPage(location.pathname);
    // eslint-disable-next-line
    localStorage.setItem('firstVisit', JSON.stringify(false));
    setFavourites();
    setPrices();
    setFirstVisit();
  }, []);

  const LoadingFavourites = ({ elem, active, slow }) => {
    return (
      <Fragment>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '30vh',
            justifyContent: 'center',
            alignItems: 'center',
            animation: active ? 'none' : 'animate5 500ms ease-in',
            animationFillMode: 'forwards',
            transitionProperty: 'transform, opacity',
            transitionTimingFunction: 'ease-out',
            transitionDuration: '1s',
          }}
        >
          <p style={{ textAlign: 'center' }}>
            {' '}
            Loading {elem}... <br></br> If you have not chosen your favourite
            coins....please head on to settings tab and select favourites...
            otherwise please wait for your selections to load...
          </p>
        </div>

        <Spinner />
      </Fragment>
    );
  };

  function roundOff(value) {
    let val = value.toString().slice(0, 8);
    return val;
  }

  const DisplayCoinDeatils = () => {
    const favCoins = {};

    for (let i = 0; i < favourites.length; i++) {
      favCoins[Object.keys(favourites[i])] = Object.values(favourites[i])[0];
    }

    console.log(prices);
    console.log(favCoins);

    return (
      <Fragment>
        <CoinGrid className='card-dark'></CoinGrid>
        <CoinPriceChart></CoinPriceChart>
      </Fragment>
    );
  };

  if (!favourites || !prices) {
    if (!favourites) {
      return <LoadingFavourites active elem={'Favourites'} />;
    } else {
      return <LoadingFavourites active elem={'Prices'} />;
    }
  } else {
    return (
      <Fragment>
        <DisplayCoinDeatils></DisplayCoinDeatils>
      </Fragment>
    );
  }
};

export default Dashboard;
