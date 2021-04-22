import React, { useContext, Fragment } from 'react';
import styled from 'styled-components';
import DashboardContext from '../../Context/DashboardContext';
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
    font-size: var(--m-length-l);
  }
`;

const FavouriteCoin = styled.div`
  box-shadow: 0px 0px 1px 1px var(--main-color-pink);
`;

const FavouriteDeleteButton = styled.button`
  text-align: center;
  margin: 5px 5px;
  padding: 3px 10px;
  background-color: var(--font-color-1);
  border-style: none;
  cursor: pointer;
  border: 1px solid transparent;
  transition-property: animation, background-color, transform;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  &:hover {
    background-color: var(--font-color-2);
    animation: animate3 5s infinite alternate;
    transform: scale(1.1, 1.1);
  }
  border-radius: var(--m-length-m);
`;

const FavouriteDeleteAllButton = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 5px 5px;
  padding: 5px 10px;
  background-color: var(--font-color-1);
  border-style: none;
  cursor: pointer;
  border: 1px solid transparent;
  transition-property: animation, background-color, transform;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  &:hover {
    background-color: var(--font-color-2);
    animation: animate3 5s infinite alternate;
    transform: scale(1.1, 1.1);
  }
  border-radius: var(--m-length-m);
`;

const FavouriteCoins = () => {
  const dashboardContext = useContext(DashboardContext);

  const { favourites, setFavourites } = dashboardContext;

  console.log('Favourites Grid Started');

  const onClickDelete = (e) => {
    let cryptoData = JSON.parse(localStorage.getItem('cryptoData'));
    console.log(cryptoData);
    cryptoData = cryptoData.filter(
      (coinObject) =>
        Object.keys(coinObject).toString() !== e.target.id.toString()
    );
    if (cryptoData.length !== 0) {
      localStorage.setItem('cryptoData', JSON.stringify(cryptoData));
    } else {
      localStorage.setItem('cryptoData', JSON.stringify(null));
    }
    setFavourites();
  };

  const onClickDeleteAll = () => {
    localStorage.setItem('cryptoData', JSON.stringify(null));
    setFavourites();
  };

  const favCoins = {};

  for (let i = 0; i < favourites.length; i++) {
    favCoins[Object.keys(favourites[i])] = Object.values(favourites[i])[0];
  }

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
              <div></div>
              <FavouriteDeleteButton id={coinKey} onClick={onClickDelete}>
                Delete
              </FavouriteDeleteButton>
            </FavouriteCoin>
          ))}
        </CoinGrid>
        <MainDiv>
          <FavouriteDeleteAllButton onClick={onClickDeleteAll}>
            <h3>Delete All</h3>
          </FavouriteDeleteAllButton>
        </MainDiv>
      </div>

      <MainDiv>
        <h3>Select any coin to add to your favourites...</h3>
      </MainDiv>
    </Fragment>
  );
};

export default FavouriteCoins;
