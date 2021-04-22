import React, { useContext, Fragment } from 'react';
import styled from 'styled-components';
import DashboardContext from '../../Context/DashboardContext';
import Spinner from '../layout/spinner';
const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  text-align: center;
`;

const Coins = () => {
  const dashboardContext = useContext(DashboardContext);

  const {
    coinList,
    filtered,
    current,
    setCurrent,
    deleteCurrent,
  } = dashboardContext;

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
    coinCard.className = 'coin-light coin-item';
    coinCard.key = coinList[coinKey].Id;

    coinCard.innerHTML = `
    <div class='coin-grid'>
      <div>${coinList[coinKey].CoinName}</div>
        <div style='justify-self: right'>
          ${coinList[coinKey].Symbol}
        </div>
      </div>

      <img
        style='height: 70px; margin: 10px 0'
        src='http://cryptocompare.com/${coinList[coinKey].ImageUrl}'
        alt='<coin image>'
      />
      <div class='coin-grid'>
        <button class='coin-button'>Add</button>
        <button class='coin-button'>Delete</button>
      </div>
    </div>
    `;

    container.appendChild(coinCard);
  }

  console.log(coinList[coins[0]]);

  //Infinite Scroll Over

  const onClickAdd = (e) => {
    e.target.parentElement.parentElement.style.boxShadow =
      '0px 0px 3px 3px var(--font-color-2)';
    if (
      current.find((elem) => elem === e.target.attributes.coinKey.nodeValue) ===
      undefined
    ) {
      setCurrent(e.target.attributes.coinKey.nodeValue);
    }
  };

  const onClickDelete = (e) => {
    e.target.parentElement.parentElement.style.boxShadow = 'none';
    if (
      current.find((elem) => elem === e.target.attributes.coinKey.nodeValue) !==
      undefined
    ) {
      deleteCurrent(e.target.attributes.coinKey.nodeValue);
    }
  };

  return (
    <Fragment>
      <CoinGrid id='coinGridContainer' className='card-dark'>
        {coins.slice(0, 90).map((coinKey) => (
          <div className='coin-light coin-item' key={coinList[coinKey].Id}>
            <div className='coin-grid'>
              <div>{coinList[coinKey].CoinName}</div>
              <div style={{ justifySelf: 'right' }}>
                {coinList[coinKey].Symbol}
              </div>
            </div>

            <img
              style={{ height: '70px', margin: '10px 0' }}
              src={`http://cryptocompare.com/${coinList[coinKey].ImageUrl}`}
              alt='<coin image>'
            />

            <div className='coin-grid'>
              <button
                className='coin-button'
                coinkey={coinKey}
                onClick={onClickAdd}
              >
                Select
              </button>
              <button
                className='coin-button'
                coinkey={coinKey}
                onClick={onClickDelete}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </CoinGrid>
      {coinIndex >= coins.length ? {} : <Spinner></Spinner>}
    </Fragment>
  );
};

export default Coins;
