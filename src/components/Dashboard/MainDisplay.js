import React, { Fragment } from 'react';
import CoinPriceChart from '../Chart/CoinPriceChart';
import DashboardContext from '../../Context/DashboardContext';
import styled, { css } from 'styled-components';

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr;
`;

const SpotLightCoin = () => {
  return (
    <Fragment>
      <div>SpotLightCoins</div>
    </Fragment>
  );
};

const DataChart = () => {
  return (
    <Fragment>
      <div>
        <CoinPriceChart></CoinPriceChart>
      </div>
    </Fragment>
  );
};
const MainDisplay = () => {
  return (
    <Fragment>
      <MainGrid>
        <SpotLightCoin></SpotLightCoin>
        <DataChart></DataChart>
      </MainGrid>
    </Fragment>
  );
};

export default MainDisplay;
