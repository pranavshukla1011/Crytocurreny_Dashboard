import React, { useContext, Fragment, useEffect } from 'react';
import styled from 'styled-components';
import DashboardContext from '../../Context/DashboardContext';
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

const FilterDeleteAllButton = styled.button`
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

const FilteredCoins = () => {
  const dashboardContext = useContext(DashboardContext);

  const {
    coinList,
    filtered,
    current,
    setCurrent,
    deleteCurrent,
    clearFilterText,
    filterCoins,
  } = dashboardContext;

  console.log('Filtered CoinGrid Started');
  useEffect(() => {}, [filtered]);
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

  const onClickDeleteAll = () => {
    clearFilterText();
    filterCoins([]);
  };

  return (
    <Fragment>
      <div className='card-dark'>
        <MainDiv>
          <h1>Filtered Coins</h1>
        </MainDiv>
        <CoinGrid id='filteredCoinGridContainer' className='card-dark'>
          {filtered.map((coinKey) => (
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
        <MainDiv>
          <FilterDeleteAllButton onClick={onClickDeleteAll}>
            <h3>Delete All</h3>
          </FilterDeleteAllButton>
        </MainDiv>
      </div>
    </Fragment>
  );
};

export default FilteredCoins;
