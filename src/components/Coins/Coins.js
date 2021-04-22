import React, { useContext, Fragment } from 'react';
import styled from 'styled-components';
import DashboardContext from '../../Context/DashboardContext';
import Spinner from '../layout/spinner';
const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  text-align: center;
`;
const MainDiv = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  animation: animate4 5s infinite alternate;

  align-items: center;
  justify-content: center;
  color: var(--font-color-3);
  margin: 20px 300px 30px 300px;
  padding: 10px 0;
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

const Coins = () => {
  const dashboardContext = useContext(DashboardContext);

  const { coinList, current, setCurrent, deleteCurrent } = dashboardContext;

  console.log('CoinGrid Started');

  //Infinite Scroll

  let coins;

  coins = Object.keys(coinList);

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
      <MainDiv>
        <h1>All Coins</h1>
      </MainDiv>
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
