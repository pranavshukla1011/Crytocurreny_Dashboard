import React, { useContext, Fragment } from 'react';
import styled from 'styled-components';
import DashboardContext from '../../Context/DashboardContext';
import Spinner from '../layout/spinner';
import cc from 'cryptocompare';
cc.setApiKey(
  '724862db550136603183e13b1c037c5261864518c32be4522aa428e895ddd035'
);
const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  text-align: center;
`;
const MainDiv = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  //   animation: animate3 5s infinite alternate;
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
      createCoinGrid(coinIndex);
    }
  });

  function createCoinGrid(coinIndex) {
    let i;
    let canContinue = true;
    if (coinIndex + 90 < coins.length) {
      for (i = coinIndex; i < coinIndex + 91; i++) {
        try {
          createCoinCard(coins[i]);
        } catch (err) {
          canContinue = false;
          break;
        }
        if (!canContinue) {
          break;
        }
      }
      coinIndex += i;
    } else {
      for (i = coinIndex; i < coins.length; i++) {
        try {
          createCoinCard(coins[i]);
        } catch (err) {
          canContinue = false;
          break;
        }
        if (!canContinue) {
          break;
        }
      }
      coinIndex = coins.length;
    }
  }

  function onClickAdd(e) {
    e.target.parentElement.parentElement.style.boxShadow =
      '0px 0px 3px 3px var(--font-color-2)';
    if (
      current.find((elem) => elem === e.target.attributes.coinKey.nodeValue) ===
      undefined
    ) {
      setCurrent(e.target.attributes.coinKey.nodeValue);
    }
  }

  function onClickDelete(e) {
    e.target.parentElement.parentElement.style.boxShadow = 'none';
    if (
      current.find((elem) => elem === e.target.attributes.coinKey.nodeValue) !==
      undefined
    ) {
      deleteCurrent(e.target.attributes.coinKey.nodeValue);
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
      </div>
      `;

    const coinButtonGrid = document.createElement('div');
    coinButtonGrid.className = 'coin-grid';

    const button1 = document.createElement('button');
    button1.className = 'coin-button';
    button1.innerHTML = 'select';
    button1.onclick = onClickAdd;
    button1.setAttribute('coinKey', coinKey);

    const button2 = document.createElement('button');
    button2.className = 'coin-button';
    button2.innerHTML = 'delete';
    button2.onclick = onClickDelete;
    button2.coinKey = coinKey;

    coinButtonGrid.appendChild(button1);
    coinButtonGrid.appendChild(button2);

    coinCard.appendChild(coinButtonGrid);

    try {
      container.appendChild(coinCard);
    } catch (err) {
      throw err;
    }
  }

  //Infinite Scroll Over

  return (
    <Fragment>
      <MainDiv>
        <h1
          style={{
            animation: 'animate4 5s infinite alternate',
            padding: '0 100px',
            margin: '20px 0',
          }}
        >
          All Coins
        </h1>
      </MainDiv>
      <CoinGrid id='coinGridContainer' className='card-dark'>
        {coins.slice(0, 90).map((coinKey) => {
          // coinItem
          return (
            <Fragment>
              <div
                className='coin-light coin-item'
                key={coinList[coinKey].Id}
                style={{
                  boxShadow: current.find(
                    (coinCurrent) => coinCurrent === coinKey
                  )
                    ? '0px 0px 3px 3px var(--font-color-2)'
                    : 'none',
                }}
              >
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
            </Fragment>
          );
        })}
      </CoinGrid>
      {coinIndex >= coins.length ? {} : <Spinner></Spinner>}
    </Fragment>
  );
};

export default Coins;
