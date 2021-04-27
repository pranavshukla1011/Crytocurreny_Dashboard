import React, { useReducer } from 'react';
import DashboardContext from '../Context/DashboardContext';
import DashboardReducer from '../Context/DashboardReducer';
import moment from 'moment';
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
  SET_PRICES,
  SET_CURRENT_FROM_LOCAL_STORAGE,
  SET_DASHBOARD_CURRENT,
  DELETE_DASHBOARD_CURRENT,
  SET_DASHBOARD_CURRENT_FROM_LOCAL_STORAGE,
  SET_DASHBOARD_FAVOURITES,
  SET_ALERT,
  REMOVE_ALERT,
  GET_HISTORY_DATA,
} from '../Context/types';
import cc from 'cryptocompare';
cc.setApiKey(
  '724862db550136603183e13b1c037c5261864518c32be4522aa428e895ddd035'
);

const DashboardState = (props) => {
  //initial state
  const initialState = {
    page: '/',
    firstVisit: true,
    favourites: null,
    coinList: null,
    filtered: [],
    filterText: null,
    current: [],
    prices: null,
    spotlight: [],
    dashboardCurrent: [],
    dashboardFavourites: null,
    alert: null,
    coinHistory: null,
  };

  //props
  const [state, dispatch] = useReducer(DashboardReducer, initialState);

  //actions
  const setPage = (path) => {
    dispatch({ type: SET_PAGE, payload: path });
  };

  const setFirstVisit = () => {
    dispatch({ type: SET_FIRST_VISIT });
  };

  const setFavourites = () => {
    dispatch({ type: SET_FAVOURITES });
  };

  const setCoinList = async () => {
    let coinData = await cc.coinList();
    dispatch({ type: SET_COIN_LIST, payload: coinData.Data });
  };

  const setPrices = async () => {
    let localData = [];

    if (!Array.isArray(JSON.parse(localStorage.getItem('cryptoData')))) {
      dispatch({ type: SET_PRICES, payload: null });
    } else {
      localData.push(
        JSON.parse(localStorage.getItem('cryptoData')).map((obj) =>
          Object.keys(obj)
        )
      );
      let coinPrices = await cc.priceFull(localData, ['USD']);
      // coinPrices = coinPrices.filter((price) => Object.keys(price).length);
      dispatch({ type: SET_PRICES, payload: coinPrices });
    }
  };

  const filterCoins = (filteredArray) => {
    dispatch({ type: SET_FILTER, payload: filteredArray });
  };

  const clearFilterText = () => {
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

  const setCurrentFromLocalStorage = () => {
    dispatch({ type: SET_CURRENT_FROM_LOCAL_STORAGE });
  };

  const setDashboardCurrent = (value) => {
    dispatch({ type: SET_DASHBOARD_CURRENT, payload: value });
  };

  const deleteDashboardCurrent = (value) => {
    dispatch({ type: DELETE_DASHBOARD_CURRENT, payload: value });
  };

  const setDashboardCurrentFromLocalStorage = () => {
    dispatch({ type: SET_DASHBOARD_CURRENT_FROM_LOCAL_STORAGE });
  };

  const setDashboardFavourites = () => {
    dispatch({ type: SET_DASHBOARD_FAVOURITES });
  };

  const setAlert = (value) => {
    dispatch({ type: SET_ALERT, payload: value });
    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
        }),
      3000
    );
  };

  const getCoinHistory = async () => {
    const coinPriceHistory = getHistory();
    console.log('coinPriceHistory');
    console.log(coinPriceHistory);
    dispatch({ type: GET_HISTORY_DATA, payload: coinPriceHistory });
  };

  function getHistory() {
    const TIME_UNITS = 20;

    const promises = {};

    state.dashboardFavourites.map((coinKey) => {
      let coinPromise = [];

      for (let i = TIME_UNITS; i >= 0; i--) {
        getCoinPriceHistory(coinKey, i).then((value) => {
          coinPromise.push(value);
        });
      }
      promises[coinKey] = coinPromise;
    });

    console.log('promises');
    console.log(promises);
    return promises;
  }

  const getCoinPriceHistory = async (coinKey, i) => {
    const priceHistory = await cc.priceHistorical(
      coinKey,
      ['USD'],
      moment().subtract({ months: i }).toDate()
    );

    return priceHistory;
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
        prices: state.prices,
        current: state.current,
        spotlight: state.spotlight,
        dashboardCurrent: state.dashboardCurrent,
        dashboardFavourites: state.dashboardFavourites,
        alert: state.alert,
        coinHistory: state.coinHistory,
        setFilterText,
        filterCoins,
        clearFilterText,
        setPage,
        setFirstVisit,
        setFavourites,
        setCoinList,
        setCurrent,
        deleteCurrent,
        setPrices,
        setCurrentFromLocalStorage,
        setDashboardCurrent,
        deleteDashboardCurrent,
        setDashboardCurrentFromLocalStorage,
        setDashboardFavourites,
        setAlert,
        getCoinHistory,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardState;
