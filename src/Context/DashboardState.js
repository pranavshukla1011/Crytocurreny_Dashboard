import React, { useReducer } from 'react';
import DashboardContext from '../Context/DashboardContext';
import DashboardReducer from '../Context/DashboardReducer';
import {
  SET_PAGE,
  SET_FIRST_VISIT,
  SET_FAVOURITES,
  SET_COIN_LIST,
  SET_FILTER,
  CLEAR_FILTER,
  SET_FILTER_TEXT,
  SET_CURRENT,
  DELETE_CURRENT,
} from '../Context/types';
import cc, { coinList } from 'cryptocompare';
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
    filtered: null,
    filterText: null,
    current: [],
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

  const filterCoins = (text) => {
    dispatch({ type: SET_FILTER, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const setFilterText = (text) => {
    dispatch({ type: SET_FILTER_TEXT, payload: text });
  };

  const setCurrent = (value) => {
    dispatch({ type: SET_CURRENT, payload: value });
  };

  const deleteCurrent = (value) => {
    dispatch({ type: DELETE_CURRENT, payload: value });
  };
  return (
    <DashboardContext.Provider
      value={{
        page: state.page,
        firstVisit: state.firstVisit,
        favourites: state.favourites,
        coinList: state.coinList,
        filtered: state.filtered,
        filterText: state.filterText,
        current: state.current,
        setFilterText,
        filterCoins,
        clearFilter,
        setPage,
        setFirstVisit,
        setFavourites,
        setCoinList,
        setCurrent,
        deleteCurrent,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardState;
