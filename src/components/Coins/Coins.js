import React, { useContext, Fragment } from 'react';
import styled from 'styled-components';
import DashboardContext from '../../Context/DashboardContext';
import Spinner from '../layout/spinner';

const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
  margin: 20px 10px;
`;

const CoinCard = styled.div`
  &:hover {
    box-shadow: 0px 0px 4px 3px var(--font-color-3);
    cursor: pointer;
  }
`;

const Coins = () => {
  const dashboardContext = useContext(DashboardContext);

  const { coinList, filtered } = dashboardContext;

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
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

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
    const coinCard = document.createElement(CoinCard);
    coinCard.className = 'card-dark';
    coinCard.key = coinList[coinKey].Id;
    coinCard.innerHTML = `${coinKey}`;
    container.appendChild(coinCard);
  }

  //Infinite Scroll Over
  return (
    <Fragment>
      <CoinGrid id='coinGridContainer'>
        {coins.slice(0, 90).map((coinKey) => (
          <CoinCard className='card-dark' key={coinList[coinKey].Id}>
            {coinKey}
          </CoinCard>
        ))}
      </CoinGrid>
      {coinIndex >= coins.length ? {} : <Spinner></Spinner>}
    </Fragment>
  );
};

export default Coins;