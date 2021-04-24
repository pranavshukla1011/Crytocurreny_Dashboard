import React, { useContext, useEffect, Fragment } from 'react';
import DashboardContext from '../../Context/DashboardContext';
import Spinner from '../layout/spinner';
import CoinPriceChart from '../Chart/CoinPriceChart';
import styled, { css } from 'styled-components';

const Dashboard = ({ location }) => {
  const dashboardContext = useContext(DashboardContext);
  const {
    firstVisit,
    spotlight,
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
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
    justify-conten: center;
    align-items: center;
  `;

  const PriceCoin = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    box-shadow: 0px 0px 1px 1px var(--main-color-pink);
    justify-conten: center;
    align-items: center;
  `;

  const PriceValue = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    justify-content: space-between;
    align-items: center;
    & p {
      margin: 5px;
    }
  `;
  const PriceValueStyle = styled.p`
    margin: 5px 0;
    ${(props) =>
      props.price <= 0
        ? css`
            color: red;
            opacity: 0.7;
          `
        : css`
            color: green;
          `}
  `;

  const PriceCoinImg = styled.img`
    height: 100px;
    margin: 10px 0;
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
        <div className='card-dark' style={{ textAlign: 'center' }}>
          {' '}
          <h1>Your Coins </h1>
          {Object.keys(favCoins).length === Object.keys(prices).length ? (
            <Fragment></Fragment>
          ) : (
            <div style={{ textAlign: 'center' }} className='card-dark'>
              <h3>
                Coin prices for some favourites are unavailable at the moment
              </h3>
            </div>
          )}
        </div>
        <CoinGrid className='card-dark'>
          {Object.keys(prices).map((coinKey) => (
            <PriceCoin className='coin-light' key={favCoins[coinKey].Id}>
              <div>
                <h1>{favCoins[coinKey].CoinName}</h1>
                <PriceValue>
                  <p>%24hr</p>
                  <PriceValueStyle
                    price={prices[coinKey]['USD'].CHANGEPCT24HOUR}
                  >
                    {roundOff(prices[coinKey]['USD'].CHANGEPCT24HOUR)}%
                  </PriceValueStyle>
                </PriceValue>

                <PriceValue>
                  <p>%day</p>
                  <PriceValueStyle price={prices[coinKey]['USD'].CHANGEPCTDAY}>
                    {roundOff(prices[coinKey]['USD'].CHANGEPCTDAY)}%
                  </PriceValueStyle>
                </PriceValue>

                <PriceValue>
                  <p>%hr</p>
                  <PriceValueStyle price={prices[coinKey]['USD'].CHANGEPCTHOUR}>
                    {roundOff(prices[coinKey]['USD'].CHANGEPCTHOUR)}%
                  </PriceValueStyle>
                </PriceValue>
              </div>
              <div>
                <PriceCoinImg
                  src={`http://cryptocompare.com/${favCoins[coinKey].ImageUrl}`}
                  alt='<coin image>'
                />
              </div>
            </PriceCoin>
          ))}
        </CoinGrid>
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
