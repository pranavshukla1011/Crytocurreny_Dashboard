import { SET_PAGE, SET_FIRST_VISIT, SET_FAVOURITES } from '../Context/types';

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
    default:
      return state;
  }
};
