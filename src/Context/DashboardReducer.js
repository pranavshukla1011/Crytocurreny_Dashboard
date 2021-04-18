import {
  SET_PAGE,
  SET_FIRST_VISIT,
  SET_FAVOURITES,
  SET_CRYPTO_DATA,
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
        favourites: action.payload,
      };
    case SET_CRYPTO_DATA:
      return {
        ...state,
        cryptoData: localStorage.setItem(
          'cryptoData',
          JSON.stringify(action.payload)
        ),
      };
    default:
      return state;
  }
};
