import React, { useReducer } from 'react';
import DashboardContext from '../Context/DashboardContext';
import DashboardReducer from '../Context/DashboardReducer';
import { SET_PAGE, SET_FIRST_VISIT } from '../Context/types';

const DashboardState = (props) => {
  //initial state
  const initialState = {
    page: '/',
    firstVisit: true,
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

  return (
    <DashboardContext.Provider
      value={{
        page: state.page,
        firstVisit: state.firstVisit,
        setPage,
        setFirstVisit,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardState;
