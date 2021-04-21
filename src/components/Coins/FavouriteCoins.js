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

  const { favourites } = dashboardContext;

  console.log('Favourites Grid Started');

  const favCoins = {};

  for (let i = 0; i < favourites.length; i++) {
    favCoins[Object.keys(favourites[i])] = Object.values(favourites[i])[0];
  }
  console.log(favCoins);
  return (
    <Fragment>
      <div className='card-dark'>
        <MainDiv>
          <h1>Your Coins</h1>
        </MainDiv>
        <CoinGrid>
          {Object.keys(favCoins).map((coinKey) => (
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
