import { coinList } from 'cryptocompare';
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
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case SET_FILTER:
      const coins = Object.keys(state.coinList);
      const coinList = state.coinList;
      return {
        ...state,
        filtered: coins.filter((key) => {
          return (
            state.coinList[key].CoinName.toString()
              .toLowerCase()
              .includes(state.filterText.toString.toLowerCase) ||
            state.coinList[key].Symbol.toString()
              .toLowerCase()
              .includes(state.filterText.toString.toLowerCase) ||
            state.coinList[key].FullName.toString().includes(
              state.filterText.toString.toLowerCase
            ) ||
            state.coinList[key].Name.toString().includes(
              state.filterText.toString.toLowerCase
            )
          );
        }),
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
        current: state.current.filter((coinKey) => coinKey != action.payload),
      };
    default:
      return state;
  }
};
