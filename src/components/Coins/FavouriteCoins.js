import React, { useContext, Fragment } from 'react';
import styled from 'styled-components';
import DashboardContext from '../../Context/DashboardContext';
import Spinner from '../layout/spinner';
const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin: 20px 10px;
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
    margin: var(--m-length-m) 0 0 0;
    font-size: var(--m-length-l);
  }
`;

const FavouriteCoin = styled.div`
  &:hover {
    box-shadow: none;
  }
`;

const FavouriteCoins = () => {
  const dashboardContext = useContext(DashboardContext);

  const { coinList, favourites } = dashboardContext;

  console.log('Favourites Grid Started');

  return (
    <Fragment>
      <div className='card-dark'>
        <MainDiv>
          <h1>Your Coins</h1>
        </MainDiv>
        <CoinGrid>
          {Object.keys(coinList)
            .slice(0, 10)
            .map((coinKey) => (
              <FavouriteCoin className='coin-light' key={coinList[coinKey].Id}>
                <div className='coin-grid'>
                  <div>{coinList[coinKey].CoinName}</div>
                  <div style={{ justifySelf: 'right' }}>
                    {coinList[coinKey].Symbol}
                  </div>
                </div>

                <img
                  style={{ height: '50px' }}
                  src={`http://cryptocompare.com/${coinList[coinKey].ImageUrl}`}
                  alt='<coin image>'
                />
              </FavouriteCoin>
            ))}
        </CoinGrid>
      </div>

      <MainDiv>
        <h3>Select any coin to add to your favourites...</h3>
      </MainDiv>
    </Fragment>
  );
};

export default FavouriteCoins;
