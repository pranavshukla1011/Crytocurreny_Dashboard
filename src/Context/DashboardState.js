import React, { useReducer } from 'react';
import DashboardContext from '../Context/DashboardContext';
import DashboardReducer from '../Context/DashboardReducer';
import { SET_PAGE } from '../Context/types';

const DashboardState = (props) => {
  //initial state
  const initialState = {
    page: '/',
  };

  //props
  const [state, dispatch] = useReducer(DashboardReducer, initialState);

  //actions
  const setPage = (path) => {
    dispatch({ type: SET_PAGE, payload: path });
  };

  return (
    <DashboardContext.Provider
      value={{
        page: state.page,
        setPage,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardState;
