import {
  SET_PAGE,
  SET_FIRST_VISIT,
  SET_FAVOURITES,
  SET_COIN_LIST,
  SET_FILTER,
  CLEAR_FILTER,
  SET_FILTER_TEXT,
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
        firstVisit: action.payload,
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
      return {
        ...state,
      };

    case SET_FILTER_TEXT:
      return {
        ...state,
        filterText: action.payload,
      };
    default:
      return state;
  }
};
