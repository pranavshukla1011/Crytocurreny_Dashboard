import React, { useContext, Fragment } from 'react';
import styled from 'styled-components';
import DashboardContext from '../../Context/DashboardContext';
import Spinner from '../layout/spinner';
import CoinItem from './CoinItem';
const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
  margin: 20px 10px;
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
    } else {
      for (i = coinIndex; i < coins.length; i++) {
        createCoinCard(coins[i]);
      }
      coinIndex = coins.length;
    }
  }

  function createCoinCard(coinKey) {
    const container = document.querySelector('#coinGridContainer');

    const coinCard = document.createElement('div');
    coinCard.className = 'coin-dark';
    coinCard.innerHTML = `${coinKey}`;
    // const coinCard = (
    //   <Fragment>
    //     <CoinCard className='card-dark' key={coinList[coinKey].Id}>
    //       ${coinKey}
    //     </CoinCard>
    //   </Fragment>
    // );
    container.appendChild(coinCard);
  }

  //Infinite Scroll Over
  return (
    <Fragment>
      <CoinGrid id='coinGridContainer'>
        {coins.slice(0, 90).map((coinKey) => (
          <div className='coin-dark' key={coinList[coinKey].Id}>
            ${coinKey}
          </div>
        ))}
      </CoinGrid>
      {coinIndex >= coins.length ? {} : <Spinner></Spinner>}
    </Fragment>
  );
};

export default Coins;
