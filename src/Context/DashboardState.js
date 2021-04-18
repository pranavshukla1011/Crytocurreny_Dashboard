import React, { useReducer } from 'react';
import DashboardContext from '../Context/DashboardContext';
import DashboardReducer from '../Context/DashboardReducer';
import {
  SET_PAGE,
  SET_FIRST_VISIT,
  SET_FAVOURITES,
  SET_COIN_LIST,
} from '../Context/types';
import cc from 'cryptocompare';
cc.setApiKey(
  '724862db550136603183e13b1c037c5261864518c32be4522aa428e895ddd035'
);

const DashboardState = (props) => {
  //initial state
  const initialState = {
    page: '/',
    firstVisit: false,
    favourites: null,
    coinList: null,
  };

  //props
  const [state, dispatch] = useReducer(DashboardReducer, initialState);

  //actions
  const setPage = (path) => {
    dispatch({ type: SET_PAGE, payload: path });
  };

  const setFirstVisit = (value) => {
    dispatch({ type: SET_FIRST_VISIT, payload: value });
  };

  const setFavourites = () => {
    dispatch({ type: SET_FAVOURITES });
  };

  const setCoinList = async () => {
    let coinData = await cc.coinList();
    dispatch({ type: SET_COIN_LIST, payload: coinData.Data });
  };

  return (
    <DashboardContext.Provider
      value={{
        page: state.page,
        firstVisit: state.firstVisit,
        favourites: state.favourites,
        coinList: state.coinList,
        setPage,
        setFirstVisit,
        setFavourites,
        setCoinList,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardState;
