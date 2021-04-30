import React, { useContext, useEffect, Fragment } from 'react';
import DashboardContext from '../../Context/DashboardContext';
import Spinner from '../layout/spinner';

import styled, { css } from 'styled-components';
import MainDisplay from '../Dashboard/MainDisplay';
import Alert from '../layout/Alert';
import dashboardImg from '../../img/dashboard_loading.svg';

const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  justify-conten: center;
  align-items: center;
`;

const PriceCoin = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr;
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

const CoinImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CoinButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: none;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

const CoinNameContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 5px;
`;

const StyledInputButton = styled.div`
  display: inline;
  text-decoration: none;
  color: var(--font-color-3);
  animation: animate3 5s infinite alternate;
  border-radius: var(--m-length-m);
  padding: 10px 20px;
  margin: 10px;
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

const Dashboard = ({ location }) => {
  const dashboardContext = useContext(DashboardContext);
  const {
    prices,
    setPage,
    setFirstVisit,
    favourites,
    setFavourites,
    setPrices,
    dashboardCurrent,
    setDashboardCurrent,
    deleteDashboardCurrent,
    setDashboardFavourites,
    setAlert,
    setCoinPriceHistoryFromLocalStorage,
    setSeries,
  } = dashboardContext;

  useEffect(() => {
    setPage(location.pathname);

    localStorage.setItem('firstVisit', JSON.stringify(false));
    setFavourites();
    setPrices();
    setFirstVisit();
    setCoinPriceHistoryFromLocalStorage();
    // eslint-disable-next-line
  }, []);

  const LoadingFavourites = ({ elem, active, slow }) => {
    return (
      <Fragment>
        <div
          style={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
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
          <Spinner />
        </div>
      </Fragment>
    );
  };

  const setValueInLocalStorage = (value) => {
    localStorage.setItem('dashboardCurrent', JSON.stringify(value));
  };

  function roundOff(value) {
    if (typeof value === 'number') {
      let val = value.toString().slice(0, 8);
      return val;
    } else {
      return 0;
    }
  }

  function onClickAdd(e) {
    e.preventDefault();
    e.target.parentElement.parentElement.parentElement.style.boxShadow =
      '0px 0px 3px 3px var(--font-color-2)';
    if (
      dashboardCurrent.find(
        (elem) => elem === e.target.attributes.coinkey.nodeValue
      ) === undefined
    ) {
      if (dashboardCurrent.length < 10) {
        setDashboardCurrent(e.target.attributes.coinkey.nodeValue);
      } else {
        setAlert({
          type: 'Dashboard Current Limit Exceeded',
          msg:
            'You Can only add upto 10 main coins in your dashboard....you can however, choose any number of favourite coins',
        });
      }
    }
  }

  function onClickDelete(e) {
    e.preventDefault();
    e.target.parentElement.parentElement.parentElement.style.boxShadow = 'none';
    if (
      dashboardCurrent.find(
        (elem) => elem === e.target.attributes.coinKey.nodeValue
      ) !== undefined
    ) {
      deleteDashboardCurrent(e.target.attributes.coinKey.nodeValue);
    }
  }

  function onSubmit(e) {
    setValueInLocalStorage(dashboardCurrent);
    setDashboardFavourites();
    // setTimeout(setCoinHistory(), 2000);
    setSeries();
  }

  const DisplayCoinDeatils = () => {
    const favCoins = {};

    for (let i = 0; i < favourites.length; i++) {
      favCoins[Object.keys(favourites[i])] = Object.values(favourites[i])[0];
    }

    return (
      <Fragment>
        <div
          className='card-dark'
          style={{
            textAlign: 'center',
            animation: 'animate3 5s infinite alternate',
          }}
        >
          {' '}
          <h1>Your Coins </h1>
          {Object.keys(favCoins).length === Object.keys(prices).length ? (
            <Fragment></Fragment>
          ) : (
            <div style={{ textAlign: 'center' }} className='card-dark'>
              <h3>
                Coin prices for some of your favourite coins are unavailable at
                the moment
              </h3>
            </div>
          )}
        </div>

        {favourites.length > 9 ? (
          <Fragment>
            {' '}
            <div
              className='card-dark'
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '30px 0',
              }}
            >
              <h3>
                Select a currency(s) from above and click the button to modify
                your main coins....
              </h3>
              <StyledInputButton onClick={onSubmit}>
                {' '}
                Set main coins
              </StyledInputButton>
            </div>
            <Alert></Alert>
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}

        <CoinGrid className='card-dark'>
          {Object.keys(prices).map((coinKey) => (
            <PriceCoin
              className='coin-light'
              key={favCoins[coinKey].Id}
              style={{
                boxShadow: dashboardCurrent.find(
                  (coinCurrent) => coinCurrent === coinKey
                )
                  ? '0px 0px 3px 3px var(--font-color-2)'
                  : 'none',
              }}
            >
              <div>
                <CoinNameContainer>
                  <h1>{favCoins[coinKey].CoinName}</h1>
                  <h6>{favCoins[coinKey].Symbol}</h6>
                </CoinNameContainer>

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
                <PriceValue>
                  <p>Algo:</p>
                  <p style={{ color: 'var(--main-color-purple)' }}>
                    {' '}
                    {favCoins[coinKey].Algorithm}
                  </p>
                </PriceValue>
                <PriceValue>
                  <p>Trading?</p>
                  <p style={{ color: 'var(--main-color-purple)' }}>
                    {' '}
                    {favCoins[coinKey].IsTrading ? 'Yes' : 'No'}
                  </p>
                </PriceValue>
              </div>
              <CoinImage>
                <a
                  href={`https://cryptocompare.com/coins/${coinKey.toLowerCase()}/overview`}
                  target='_blank'
                  rel='noreferrer'
                >
                  <PriceCoinImg
                    src={`http://cryptocompare.com/${favCoins[coinKey].ImageUrl}`}
                    style={{ justifySelf: 'center' }}
                  />
                </a>

                <CoinButtonContainer className='coin-grid'>
                  <button
                    className='coinButtonDashboard'
                    coinkey={coinKey}
                    onClick={onClickAdd}
                  >
                    Select
                  </button>
                  <button
                    className='coinButtonDashboard'
                    coinkey={coinKey}
                    onClick={onClickDelete}
                  >
                    Remove
                  </button>
                </CoinButtonContainer>
              </CoinImage>
            </PriceCoin>
          ))}
        </CoinGrid>

        <Alert></Alert>

        <div
          className='card-dark'
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '30px 0',
          }}
        >
          <h3>
            Select a currency(s) from above and click the button to modify your
            main coins....
          </h3>
          <StyledInputButton onClick={onSubmit}>
            {' '}
            Set main coins
          </StyledInputButton>
        </div>
        <MainDisplay></MainDisplay>
      </Fragment>
    );
  };

  if (!favourites || !prices) {
    return (
      <Fragment>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr  2fr',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
          }}
        >
          <div>
            <img
              src={dashboardImg}
              alt='Dashboard Img'
              style={{ height: 'auto', width: '100%', padding: '50px' }}
            />
          </div>
          {!favourites ? (
            <Fragment>
              {' '}
              <LoadingFavourites active elem={'Favourites'} />{' '}
            </Fragment>
          ) : (
            <Fragment>
              {' '}
              <LoadingFavourites active elem={'Prices'} />;
            </Fragment>
          )}
        </div>
        ;
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <DisplayCoinDeatils></DisplayCoinDeatils>
      </Fragment>
    );
  }
};

export default Dashboard;
