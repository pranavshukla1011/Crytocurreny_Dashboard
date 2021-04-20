import React, { useContext, Fragment } from 'react';
import styled from 'styled-components';
import DashboardContext from '../../Context/DashboardContext';

const CoinItemCard = styled.div``;

const CoinItem = ({ coinKey }) => {
  const dashboardContext = useContext(DashboardContext);

  return <Fragment>{coinKey}</Fragment>;
};

export default CoinItem;
