import { SET_PAGE, SET_FIRST_VISIT } from '../Context/types';

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
    default:
      return state;
  }
};
