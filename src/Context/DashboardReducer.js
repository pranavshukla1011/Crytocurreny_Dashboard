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
  DELETE_COIN_PRICE_HISTORY,
  SET_COIN_PRICE_HISTORY_FROM_LOCAL_STORAGE,
  SET_SERIES,
} from '../Context/types';
// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case SET_FIRST_VISIT:
      return {
        ...state,
        firstVisit: JSON.parse(localStorage.getItem('firstVisit')),
      };
    case SET_FAVOURITES:
      return {
        ...state,
        favourites: JSON.parse(localStorage.getItem('cryptoData')),
      };
    case SET_COIN_LIST:
      return {
        ...state,
        coinList: action.payload,
      };
    case SET_PRICES:
      return {
        ...state,
        prices: action.payload,
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filterText: '',
      };
    case SET_FILTER:
      return {
        ...state,
        filtered: action.payload,
      };
    case SET_FILTER_TEXT:
      return {
        ...state,
        filterText: action.payload,
      };

    case SET_CURRENT:
      return {
        ...state,
        current: [...state.current, action.payload],
      };

    case DELETE_CURRENT:
      return {
        ...state,
        current: state.current.filter((coinKey) => coinKey !== action.payload),
      };

    case SET_CURRENT_FROM_LOCAL_STORAGE:
      return {
        ...state,
        current:
          JSON.parse(localStorage.getItem('cryptoData')) === null
            ? []
            : JSON.parse(localStorage.getItem('cryptoData')).map((coinData) =>
                Object.keys(coinData).toString()
              ),
      };

    case SET_DASHBOARD_CURRENT:
      return {
        ...state,
        dashboardCurrent: [...state.dashboardCurrent, action.payload],
      };

    case DELETE_DASHBOARD_CURRENT:
      return {
        ...state,
        dashboardCurrent: state.dashboardCurrent.filter(
          (coinKey) => coinKey !== action.payload
        ),
      };

    case SET_DASHBOARD_CURRENT_FROM_LOCAL_STORAGE:
      return {
        ...state,
        dashboardCurrent:
          JSON.parse(localStorage.getItem('dashboardCurrent')) === null
            ? []
            : JSON.parse(localStorage.getItem('dashboardCurrent')).map(
                (coinKey) => coinKey
              ),
      };

    case SET_DASHBOARD_FAVOURITES:
      return {
        ...state,
        dashboardFavourites:
          JSON.parse(localStorage.getItem('dashboardCurrent')) === null
            ? null
            : JSON.parse(localStorage.getItem('dashboardCurrent')),
      };
    case SET_ALERT: {
      return {
        ...state,
        alert: action.payload,
      };
    }
    case REMOVE_ALERT: {
      return {
        ...state,
        alert: null,
      };
    }
    case GET_HISTORY_DATA: {
      return {
        ...state,
        coinHistory: action.payload,
      };
    }
    case DELETE_COIN_PRICE_HISTORY: {
      let obj = state.coinHistory;
      delete obj[action.payload];
      return {
        ...state,
        coinHistory: obj,
      };
    }

    case SET_COIN_PRICE_HISTORY_FROM_LOCAL_STORAGE: {
      return {
        ...state,
        coinHistory: action.payload,
      };
    }

    case SET_SERIES: {
      return {
        ...state,
        chartSeries: action.payload,
      };
    }

    default:
      return state;
  }
};
